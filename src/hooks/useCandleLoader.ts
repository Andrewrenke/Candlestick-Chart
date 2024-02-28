import { useState, useEffect } from "react";
import { Candle } from "../types/candle";

// DO NOT MODIFY THIS TYPE
type CandleLoaderParams =
  | {
      enabled: false;
      symbol?: string | null;
    }
  | {
      enabled: true;
      symbol: string;
    };

// DO NOT MODIFY THIS TYPE
type CandleLoaderHook =
  | {
      status: "loading" | "idle";
      data: null;
      error: null;
    }
  | {
      status: "error";
      data: null;
      error: string;
    }
  | {
      status: "success";
      data: Candle[];
      error: null;
    };

const BASE_URL = "/candles";

export function useCandleLoader({
  enabled,
  symbol,
}: CandleLoaderParams): CandleLoaderHook {
  const [result, setResult] = useState<CandleLoaderHook>({
    status: enabled ? "loading" : "idle",
    data: null,
    error: null,
  });

  useEffect(() => {
    if (!enabled || !symbol) {
      setResult({ status: "idle", data: null, error: null });
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/${symbol}.json`);

        if (!response.ok) {
          throw new Error("Failed to fetch");
        }

        const rawData: (number | null)[] = (await response.json()) as (
          | number
          | null
        )[];
        const data = processData(rawData);
        setResult({ status: "success", data, error: null });
      } catch (error) {
        setResult({
          status: "error",
          data: null,
          error: error instanceof Error ? error.message : "Error",
        });
      }
    };

    void fetchData();
  }, [enabled, symbol]);

  return result;
}

function processData(rawData: (number | null)[]): Candle[] {
  const processedData: Candle[] = [];
  let lastClose = 0;

  for (let i = 0; i < rawData.length; ) {
    const open = rawData[i];
    const high = rawData[i + 1]!;
    const low = rawData[i + 2]!;
    const close = rawData[i + 3]!;

    if (open === null) {
      if (processedData.length) {
        processedData.push({
          open: lastClose,
          high: lastClose,
          low: lastClose,
          close: lastClose,
        });
      }
      i++;

      continue;
    }

    processedData.push({ open, high, low, close });
    lastClose = close;
    i += 5;
  }

  return processedData;
}
