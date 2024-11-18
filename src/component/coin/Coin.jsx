import React from "react";
import s from "./Coin.module.css";
import CoinChart from "./CoinChart";
import { Link } from "react-router-dom";

const Coin = ({ coin }) => {
  // Function to format numbers with commas
  const formatNumber = (number) => {
    return new Intl.NumberFormat().format(number);
  };

  return (
    <>
      <td>{coin.market_cap_rank}</td>
      <td className={`sticky-column ${s.name}`}>
        <Link
          className={s.link}
          to={`/coin/${coin.id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className={s.imgsym}>
            <img src={coin.image} alt={`${coin.name} image`} />
            <span className={s.symbol}>{coin.symbol}</span>
          </div>
          <div className={s.nametitle}>{coin.name}</div>
        </Link>
      </td>

      <td>${formatNumber(coin.current_price)} </td>
      <td
        className={
          coin.price_change_percentage_1h_in_currency >= 0 ? "green" : "red"
        }
      >
        <span className={"updown"}>
          {coin.price_change_percentage_1h_in_currency >= 0 ? "▲" : "▼"}
        </span>
        {Math.abs(coin.price_change_percentage_1h_in_currency.toFixed(2))}%
      </td>
      <td className={coin.price_change_percentage_24h >= 0 ? "green" : "red"}>
        <span className={"updown"}>
          {coin.price_change_percentage_24h >= 0 ? "▲" : "▼"}
        </span>
        {Math.abs(coin.price_change_percentage_24h.toFixed(2))}%
      </td>
      <td
        className={
          coin.price_change_percentage_7d_in_currency >= 0 ? "green" : "red"
        }
      >
        <span className={"updown"}>
          {coin.price_change_percentage_7d_in_currency >= 0 ? "▲" : "▼"}
        </span>
        {Math.abs(coin.price_change_percentage_7d_in_currency.toFixed(2))}%
      </td>
      <td>${formatNumber(coin.market_cap)}</td>
      <td>${formatNumber(coin.total_volume)}</td>
      <td>
        <CoinChart sparklineData={coin.sparkline_in_7d} />
      </td>
    </>
  );
};

export default Coin;
