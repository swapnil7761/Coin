import Coin from "./Coin.jsx";

function Cointable({ filterCoins, handleSort }) {
  return (
    <>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th className="sticky-column" onClick={() => handleSort("name")}>
                Name
              </th>
              <th onClick={() => handleSort("current_price")}>Price</th>
              <th onClick={() => handleSort("price_change_percentage_24h")}>
                24h %
              </th>
              <th onClick={() => handleSort("market_cap")}>Market Cap</th>
              <th onClick={() => handleSort("total_volume")}>Volume 24h</th>
              <th onClick={() => handleSort("circulating_supply")}>
                Circulating Supply
              </th>
              <th>Last 7D</th>
            </tr>
          </thead>
          <tbody>
            {filterCoins.map((coin, index) => (
              <tr
                key={coin.id}
                className="table-row"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Coin coin={coin} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Cointable;
