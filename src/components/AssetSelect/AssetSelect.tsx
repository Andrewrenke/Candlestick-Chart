import { useState, useEffect } from "react";
import classes from "./AssetSelect.module.scss";

function AssetSelect() {
  const [activeSymbol, setActiveSymbol] = useState<string | null>(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const symbol = queryParams.get("symbol");
    setActiveSymbol(symbol);
  }, []);

  const isActive = (symbol: string) => activeSymbol === symbol;

  return (
    <div className={classes["asset-select"]}>
      <a
        href="?symbol=BTCUSDT"
        className={isActive("BTCUSDT") ? classes.active : ""}
      >
        BTC/USDT
      </a>
      <a
        href="?symbol=ETHUSDT"
        className={isActive("ETHUSDT") ? classes.active : ""}
      >
        ETH/USDT
      </a>
      <a
        href="?symbol=XRPUSDT"
        className={isActive("XRPUSDT") ? classes.active : ""}
      >
        XRP/USDT
      </a>
    </div>
  );
}

export default AssetSelect;
