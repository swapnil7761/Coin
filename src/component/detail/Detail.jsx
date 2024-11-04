import s from "./Detail.module.css";

const Coindetail = ({ coin }) => {
  if (!coin) {
    return <div>Loading...</div>;
  }
  console.log(coin);

  let supplyrate = (
    (coin.market_data.circulating_supply * 100) /
    coin.market_data.max_supply
  ).toFixed(1);

  return (
    <div className={` ${s.detailcover}`}>
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
          <div>
            {coin.market_data.circulating_supply.toFixed(0)}
            {coin.market_data.max_supply ? `(${supplyrate}%)` : null}
          </div>
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
      <div className={s.sentimentsection}>
        <h3>Community sentiment</h3>
        <div className={s.sentiment}>
          <p>{coin.sentiment_votes_up_percentage}% Bullish</p>
          <div
            style={{
              width: `${coin.sentiment_votes_up_percentage}%`,
              background: "rgb(0, 253, 0)",
              borderRadius: "5px 0 0 5px",
              boxShadow: "-2px 0 5px rgb(0, 253, 0)",
            }}
          ></div>
          <div
            style={{
              width: `${coin.sentiment_votes_down_percentage}%`,
              background: "rgb(255, 59, 59)",
              borderRadius: "0 5px  5px 0",
              boxShadow: "2px 0 5px rgb(255, 59, 59)",
            }}
          ></div>
          <p>{coin.sentiment_votes_down_percentage}% Bearish</p>
        </div>
      </div>
    </div>
  );
};

export default Coindetail;
