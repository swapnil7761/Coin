import { useState, useEffect } from "react";
import Coin from "./Coin.jsx";

function Cointable({ filterCoins, handleSort }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (filterCoins.length > 0) {
      setLoading(false); // Set loading to false once data is fetched
    }
  }, [filterCoins]);

  return (
    <>
      {loading ? (
        <div className="loading-spinner">Loading...</div> // Replace with a spinner component if available
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th
                  className="sticky-column"
                  onClick={() => handleSort("name")}
                >
                  Name
                </th>
                <th onClick={() => handleSort("current_price")}>Price</th>
                <th
                  onClick={() =>
                    handleSort("price_change_percentage_1h_in_currency")
                  }
                >
                  1h
                </th>
                <th onClick={() => handleSort("price_change_percentage_24h")}>
                  24h
                </th>
                <th
                  onClick={() =>
                    handleSort("price_change_percentage_7d_in_currency")
                  }
                >
                  7d
                </th>
                <th onClick={() => handleSort("market_cap")}>Market Cap</th>
                <th onClick={() => handleSort("total_volume")}>Volume 24h</th>
                <th>Last 7D</th>
              </tr>
            </thead>
            <tbody>
              {filterCoins.map((coin, index) => (
                <tr
                  key={coin.id}
                  className="table-row"
                  style={{ animationDelay: `${index * 0.03}s` }}
                >
                  <Coin coin={coin} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default Cointable;
