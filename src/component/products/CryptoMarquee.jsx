import React from "react";
import { Link } from "react-router-dom";

const CryptoMarquee = ({ allcoins }) => {
  if (!allcoins || allcoins.length === 0) {
    return <div>Loading...</div>;
  }
  const topCoins = allcoins.slice(0, 20);

  return (
    <div className="marqueecontainer">
      <div className="marqueecontent">
        {topCoins.map((coin, index) => (
          <Link
            key={index}
            className="marqueelink"
            to={`/coin/${coin.id}`}
            rel="noopener noreferrer"
          >
            <div className="coinitem">
              <img src={coin.image} alt={coin.name} className="coinimage" />
              <span className="coinname">{coin.name}</span>
              <span>$ {coin.current_price}</span>
              <span
                className={`coinchange ${
                  coin.price_change_percentage_24h > 0 ? "positive" : "negative"
                }`}
              >
                <span className={"updown"}>
                  {coin.price_change_percentage_24h >= 0 ? "▲" : "▼"}
                </span>
                {coin.price_change_percentage_24h.toFixed(2)}%
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CryptoMarquee;
