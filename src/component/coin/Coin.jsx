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
      <td className={`sticky-column ${s.name}`}>
        <div className={s.imgsym}>
          <img src={coin.image} alt={`${coin.name} image`} />
          <span className={s.symbol}>{coin.symbol}</span>
        </div>
        <div>
          <Link
            className={s.link}
            to={`/coin/${coin.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {coin.name}
          </Link>
        </div>
      </td>
      <td>{formatNumber(coin.current_price)} $ </td>
      <td className={coin.price_change_percentage_24h >= 0 ? s.green : s.red}>
        {coin.price_change_percentage_24h.toFixed(2)}
        <span className={s.updown}>
          {coin.price_change_24h >= 0 ? "▲" : "▼"}
        </span>
      </td>
      <td>{formatNumber(coin.market_cap)} $</td>
      <td>{formatNumber(coin.total_volume)}</td>
      <td>
        {formatNumber(coin.circulating_supply.toFixed(0))}{" "}
        {coin.symbol.toUpperCase()}
      </td>
      <td>
        <CoinChart sparklineData={coin.sparkline_in_7d} />
      </td>
    </>
  );
};

export default Coin;
