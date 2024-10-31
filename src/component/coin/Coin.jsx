import React from "react";
import s from "./Coin.module.css";
import CoinChart from "./CoinChart";
import { Link } from "react-router-dom";

const Coin = ({ coin }) => {
  return (
    <tr className={s.container}>
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
      <td>$ {coin.current_price} </td>
      <td className={coin.price_change_percentage_24h >= 0 ? s.green : s.red}>
        {coin.price_change_percentage_24h.toFixed(2)}
        <span className={s.updown}>
          {coin.price_change_24h >= 0 ? "▲" : "▼"}
        </span>
      </td>
      <td>$ {coin.market_cap}</td>
      <td>{coin.total_volume}</td>
      <td>
        {coin.circulating_supply.toFixed(0)} {coin.symbol.toUpperCase()}
      </td>
      <td>
        <CoinChart sparklineData={coin.sparkline_in_7d} />
      </td>
    </tr>
  );
};

export default Coin;
