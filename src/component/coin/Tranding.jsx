import React from "react";
import CoinChart from "./CoinChart";
import s from "./Tranding.module.css";
import { Link } from "react-router-dom";

const Tranding = ({ Coins, title }) => {
  const tranding = [...Coins];
  function formatNumber(number) {
    if (number >= 1_000_000_000) {
      return `${(number / 1_000_000_000).toFixed(1)}B`;
    } else if (number >= 1_000_000) {
      return `${(number / 1_000_000).toFixed(1)}M`;
    } else if (number >= 1_000) {
      return `${(number / 1_000).toFixed(1)}K`;
    } else {
      return number.toString();
    }
  }

  return (
    <div className={`container ${s.tranding} `}>
      <div className={s.trandingtitle}>
        <h4>Tranding 24h</h4>
        <h2>{title}</h2>
      </div>
      <table className={s.trandingtable}>
        <tbody>
          {tranding.map((coin, index) => (
            <tr key={index}>
              <td className={s.trandingimgname}>
                <Link
                  className={s.link}
                  to={`/coin/${coin.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div>
                    <img src={coin.image} alt={coin.symbol} />
                  </div>
                  <p>{coin.symbol.toUpperCase()}</p>
                </Link>
              </td>
              {title === "Top Volume" ? (
                <td>$ {formatNumber(coin.total_volume)} </td>
              ) : (
                <td>
                  ${" "}
                  {coin.current_price < 0
                    ? coin.current_price.toFixed(6)
                    : coin.current_price.toFixed(2)}
                </td>
              )}
              <td
                className={
                  coin.price_change_percentage_24h >= 0 ? "green" : "red"
                }
              >
                <span className={"updown"}>
                  {coin.price_change_24h >= 0 ? "▲" : "▼"}
                </span>
                {Math.abs(coin.price_change_percentage_24h.toFixed(1))}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tranding;
