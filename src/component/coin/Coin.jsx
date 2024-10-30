import React from "react";
import s from "./Coin.module.css";
const Coin = ({ coin }) => {
  return (
    <tr className={s.container}>
      <td className={`sticky-column ${s.name}`}>
        <div className={s.imgsym}>
          <img src={coin.image} alt={`${coin.name} image`} />
          <span className={s.symbol}>{coin.symbol}</span>
        </div>
        <div>{coin.name}</div>
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
    </tr>
  );
};

export default Coin;

// {ath
// :
// 73738
// ath_change_percentage
// :
// -3.5791
// ath_date
// :
// "2024-03-14T07:10:36.635Z"
// atl
// :
// 67.81
// atl_change_percentage
// :
// 104751.53926
// atl_date
// :
// "2013-07-06T00:00:00.000Z"
// circulating_supply
// :
// 19774671
// current_price
// :
// 71209
// fully_diluted_valuation
// :
// 1493410681732
// high_24h
// :
// 71541
// id
// :
// "bitcoin"
// image
// :
// "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400"
// last_updated
// :
// "2024-10-29T09:12:26.804Z"
// low_24h
// :
// 68153
// market_cap
// :
// 1406271661863
// market_cap_change_24h
// :
// 55821938794
// market_cap_change_percentage_24h
// :
// 4.13358
// market_cap_rank
// :
// 1
// max_supply
// :
// 21000000
// name
// :
// "Bitcoin"
// price_change_24h
// :
// 2897.61
// price_change_percentage_24h
// :
// 4.24176
// roi
// :
// null
// symbol
// :
// "btc"
// total_supply
// :
// 21000000
// total_volume
// :
// 52517765551}
