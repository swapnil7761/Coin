import React, { useState, useEffect } from "react";
import s from "./Detail.module.css";

const Coindetail = ({ coin }) => {
  if (!coin) {
    return <div className={s.loader}></div>; // Display loading spinner
  }

  console.log(coin);

  let supplyrate = (
    (coin.market_data.circulating_supply * 100) /
    coin.market_data.max_supply
  ).toFixed(1);

  // Function to format numbers with commas
  const formatNumber = (number) => {
    return new Intl.NumberFormat().format(number);
  };

  return (
    <div className={`${s.detailcover}`}>
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
          ${formatNumber(coin.market_data.current_price.usd)}
          <span
            className={`${s.rate} ${
              coin.market_data.price_change_percentage_24h >= 0
                ? "green"
                : "red"
            }`}
          >
            {coin.market_data.price_change_percentage_24h.toFixed(2)}%
            <span className={`updown`}>
              {coin.market_data.price_change_percentage_24h >= 0
                ? "▲ (1D)"
                : "▼ (1D)"}
            </span>
          </span>
        </div>
      </div>
      <div>
        <p>
          Market cap{" "}
          <span
            className={s.tooltip}
            title="The total market value of a cryptocurrency's circulating supply. It is analogous to the free-float capitalization in the stock market.
Market cap = Current price x Circulating supply"
          >
            ⓘ
          </span>
        </p>
        <div>
          <div>${formatNumber(coin.market_data.market_cap.usd)}</div>
          <div
            className={
              coin.market_data.market_cap_change_percentage_24h >= 0
                ? "green"
                : "red"
            }
          >
            {coin.market_data.market_cap_change_percentage_24h.toFixed(2)}%
            <span className={"updown"}>
              {coin.market_data.market_cap_change_percentage_24h >= 0
                ? "▲"
                : "▼"}
            </span>
          </div>
        </div>
      </div>
      <div>
        <p>
          Volume{" "}
          <span
            className={s.tooltip}
            title="A measure of how much of a cryptocurrency was traded in the last 24 hours."
          >
            ⓘ
          </span>
        </p>
        <div>
          <div>${formatNumber(coin.market_data.total_volume.usd)}</div>
        </div>
      </div>
      <div>
        <p>
          FDV Ratio{" "}
          <span
            className={s.tooltip}
            title="
The Market Cap (Market Capitalization) of a cryptocurrency is the total value of all its currently circulating tokens. It is calculated by multiplying the current price per token by the circulating supply of tokens.
MarketCap to FDV Ratio = MarketCap / MarketCap = CirculatingSupply * CurrentPricePerToken"
          >
            ⓘ
          </span>
        </p>
        <div>
          <div>{coin.market_data.market_cap_fdv_ratio}</div>
        </div>
      </div>
      <div>
        <p>
          Vol/Mkt Cap (24h){" "}
          <span
            className={s.tooltip}
            title="Indicator of liquidity. The higher the ratio, the more liquid the cryptocurrency is, which should make it easier for it to be bought/sold on an exchange close to its value.
Cryptocurrencies with a low ratio are less liquid and most likely present less stable markets."
          >
            ⓘ
          </span>
        </p>
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
        <p>
          Circulating supply{" "}
          <span
            className={s.tooltip}
            title="Total supply = Total coins created - coins that have been burned (if any) It is comparable to outstanding shares in the stock market."
          >
            ⓘ
          </span>
        </p>
        <div>
          <div>
            {formatNumber(coin.market_data.circulating_supply.toFixed(0))}
            {coin.market_data.max_supply ? `(${supplyrate}%)` : null}
          </div>
        </div>
      </div>
      <div>
        <p>
          Max. supply{" "}
          <span
            className={s.tooltip}
            title="The maximum amount of coins that will ever exist in the lifetime of the cryptocurrency. It is analogous to the fully diluted shares in the stock market."
          >
            ⓘ
          </span>
        </p>
        <div>
          <div>
            {coin.market_data.max_supply
              ? formatNumber(coin.market_data.max_supply)
              : "∞"}
          </div>
        </div>
      </div>
      <div className={s.sentimentsection}>
        <h3>Community sentiment</h3>
        <div className={s.sentiment}>
          <p>{coin.sentiment_votes_up_percentage}% Bullish</p>
          <div
            style={{
              width: `${coin.sentiment_votes_up_percentage}%`,
              background: "rgb(0, 199, 0)",
              borderRadius: "5px 0 0 5px",
            }}
          ></div>
          <div
            style={{
              width: `${coin.sentiment_votes_down_percentage}%`,
              background: "rgb(255, 59, 59)",
              borderRadius: "0 5px 5px 0",
            }}
          ></div>
          <p>{coin.sentiment_votes_down_percentage}% Bearish</p>
        </div>
      </div>
    </div>
  );
};

export default Coindetail;
