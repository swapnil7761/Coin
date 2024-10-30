import React from "react";
import s from "./Tranding.module.css";

const Tranding = ({ handleSort, filterCoins }) => {
  const tranding = [...filterCoins]
    .sort(
      (a, b) =>
        Math.abs(b.price_change_percentage_24h) -
        Math.abs(a.price_change_percentage_24h)
    )
    .slice(0, 5);
  console.log(tranding);

  return (
    <div className={`container ${s.tranding} `}>
      <div className={s.trandingtitle}>
        <h1>Trending Coins </h1>
        <p>icon here</p>
      </div>
      <table className={s.trandingtable}>
        <tbody>
          {tranding.map((coin, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td className={s.trandingimgname}>
                <img src={coin.image} alt={coin.symbol} />
                {coin.symbol.toUpperCase()}
              </td>
              <td>$ {coin.current_price} </td>
              <td
                className={
                  coin.price_change_percentage_24h >= 0 ? "green" : "red"
                }
              >
                {coin.price_change_percentage_24h.toFixed(2)}
                <span className={"updown"}>
                  {coin.price_change_24h >= 0 ? "▲" : "▼"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tranding;
