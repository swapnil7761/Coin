import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import s from "../component/detail/Detail.module.css";

const Coindetail = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null); // Set initial state to null

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-PyRvXUMXcFVqbTgCszAN4FUK",
      },
    };

    fetch(`https://api.coingecko.com/api/v3/coins/${id}`, options)
      .then((res) => res.json())
      .then((res) => setCoin(res))
      .catch((err) => console.error(err));
  }, [id]);

  if (!coin) {
    return <div>Loading...</div>;
  } // Display loading message while data is being fetched
  console.log(coin);
  return (
    <div className={s.detailcover}>
      <div className={s.detailtitle}>
        <div className={s.detailimg}>
          <img src={coin.image.large} alt={coin.name} />
        </div>
        <div className={s.detailname}>
          {coin.name}
          <span className={s.detailsymbol}>{coin.symbol}</span>
          <span className={s.marketcap}>
            #{coin.market_data.market_cap_rank}
          </span>
        </div>
        <div className={s.detailprice}>
          ${coin.market_data.current_price.usd}
          <span
            className={`${s.rate}
              ${
                coin.market_data.price_change_percentage_24h >= 0
                  ? "green"
                  : "red"
              }`}
          >
            {coin.market_data.price_change_percentage_24h.toFixed(2)}%
            <span className={` updown`}>
              {coin.market_data.price_change_percentage_24h >= 0
                ? "▲ (1D)"
                : "▼ (1D)"}
            </span>
          </span>
        </div>
      </div>
      <div>
        <p>Market cap</p>
        <div>
          <div>{coin.market_data.market_cap.usd}</div>
          <div
            className={
              coin.market_data.market_cap_change_percentage_24h >= 0
                ? "green"
                : "red"
            }
          >
            {coin.market_data.market_cap_change_percentage_24h.toFixed(2)}
            <span className={"updown"}>
              {coin.market_data.market_cap_change_percentage_24h >= 0
                ? "▲"
                : "▼"}
            </span>
          </div>
        </div>
      </div>
      <div>
        <p>Volume</p>
        <div>
          <div>{coin.market_data.total_volume.usd}</div>
        </div>
      </div>
      <div>
        <p>FDV Ratio</p>
        <div>
          <div>{coin.market_data.market_cap_fdv_ratio}</div>
        </div>
      </div>
      <div>
        <p>Vol/Mkt Cap (24h)</p>
        <div>
          <div>
            {eval(
              coin.market_data.total_volume.usd /
                coin.market_data.market_cap.usd
            ).toFixed(4)}
            %
          </div>
        </div>
      </div>
      <div>
        <p>Circulating supply</p>
        <div>
          <div>{coin.market_data.circulating_supply}</div>
        </div>
      </div>
      <div>
        <p>Max. supply</p>
        <div>
          <div>
            {coin.market_data.max_supply ? coin.market_data.max_supply : "∞"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coindetail;
