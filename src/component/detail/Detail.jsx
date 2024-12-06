import React, { useState, useEffect } from "react";
import s from "./Detail.module.css";

const Coindetail = ({ coin }) => {
  if (!coin) {
    return <div className={s.loader}></div>; // Display loading spinner
  }
  let supplyrate = (
    (coin.market_data.circulating_supply * 100) /
    coin.market_data.max_supply
  ).toFixed(1);

  // Function to format numbers with commas
  const formatNumber = (number) => {
    return new Intl.NumberFormat().format(number);
  };
  return (
    <>
      <div className={s.alldetail}>
        <div className={`${s.detailcover}`}>
          <div className={s.detailtitle}>
            <div className={s.detailimg}>
              <img src={coin.image.large} alt={coin.name} />
            </div>
            <div className={s.detailname}>
              <div>
                {coin.name}
                <span className={s.detailsymbol}>{coin.symbol}</span>
              </div>
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

        <div className={`${s.socials} `}>
          <div>
            <div>Websites</div>
            <div className={s.weblink}>
              {coin.links.whitepaper && (
                <div>
                  <a
                    href={coin.links.whitepaper}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Whitepaper
                  </a>
                </div>
              )}
              {coin.links.homepage[0] && (
                <div>
                  <a
                    href={coin.links.homepage[0]}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Website
                  </a>
                </div>
              )}
            </div>
          </div>
          <div>
            <div>Socials</div>
            <div className={s.weblink}>
              {coin.links.repos_url.github && (
                <div>
                  <a
                    href={coin.links.repos_url.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </div>
              )}
              {coin.links.facebook_username && (
                <div>
                  <a
                    href={`https://www.facebook.com/groups/${coin.links.facebook_username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Facebook
                  </a>
                </div>
              )}
              {coin.links.twitter_screen_name && (
                <div>
                  <a
                    href={`https://x.com/${coin.links.twitter_screen_name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Twitter
                  </a>
                </div>
              )}
              {coin.links.subreddit_url && (
                <div>
                  <a
                    href={coin.links.subreddit_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Reddit
                  </a>
                </div>
              )}
            </div>
          </div>
          <div>
            <div>Explorers</div>
            <div className={s.weblink}>
              <select
                defaultValue=""
                onChange={(e) =>
                  e.target.value && window.open(e.target.value, "_blank")
                }
              >
                <option value="" disabled>
                  Visit Explorer
                </option>
                {coin.links.blockchain_site.map((link, index) => {
                  if (link) {
                    // Extract domain name
                    const domain = link
                      .replace(/^https?:\/\//, "")
                      .split("/")[0];
                    return (
                      <option key={index} value={link}>
                        {domain.length > 20
                          ? `${domain.slice(0, 17)}...`
                          : domain}
                      </option>
                    );
                  }
                  return null; // Skip empty links
                })}
              </select>
            </div>
          </div>
          <div className={s.alltime}>
            <div>
              <p>Price performance</p>
            </div>
            <div>
              <div className={s.alltimedate}>
                <p>All-time low</p>
                <p>
                  {coin.market_data.atl_date.usd.slice(
                    0,
                    coin.market_data.atl_date.usd.indexOf("T")
                  )}
                </p>
              </div>
              <div className={s.alltimedate} style={{ textAlign: "right" }}>
                <p>All-time high</p>
                <p>
                  {coin.market_data.ath_date.usd.slice(
                    0,
                    coin.market_data.ath_date.usd.indexOf("T")
                  )}
                </p>
              </div>
            </div>
            <div className={s.alltimebar}>
              <span
                title={`Current price: $ ${coin.market_data.current_price.usd}`}
                style={{
                  right: `calc(${
                    ((coin.market_data.ath.usd -
                      coin.market_data.current_price.usd) /
                      (coin.market_data.ath.usd - coin.market_data.atl.usd)) *
                    100
                  }%)`,
                  padding: "0 20px",
                  cursor: "pointer",
                }}
              >
                |
              </span>
            </div>
            <div>
              <p>${coin.market_data.atl.usd.toFixed(2)}</p>
              <p>${coin.market_data.ath.usd.toFixed(2)}</p>
            </div>
          </div>
          <div className={s.cointags}>
            Tags
            <div className={s.tagdiv}>
              {coin.categories.map((tag, index) => (
                <div className={s.tag} key={index}>
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Coindetail;
