import classes from "./CandleInfo.module.scss";
import { Candle } from "../../types/candle";

interface CandleInfoProps {
  candle: Candle | null;
}

function CandleInfo({ candle }: CandleInfoProps) {
  return (
    <table className={classes["candle-info"]}>
      <tbody>
        {!candle && (
          <tr>
            <td colSpan={2}>No candle selected</td>
          </tr>
        )}
        {candle && (
          <>
            <tr>
              <td>Open</td>
              <td>{candle.open}</td>
            </tr>
            <tr>
              <td>High</td>
              <td>{candle.high}</td>
            </tr>
            <tr>
              <td>Low</td>
              <td>{candle.low}</td>
            </tr>
            <tr>
              <td>Close</td>
              <td>{candle.close}</td>
            </tr>
          </>
        )}
      </tbody>
    </table>
  );
}

export default CandleInfo;
