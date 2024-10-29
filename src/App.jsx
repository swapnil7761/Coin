import { useEffect, useState } from "react";
import "./App.css";
import Coin from "./component/coin/Coin";

function App() {
  const [coins, setCoins] = useState([]);
  const [filterCoins, setFilterCoins] = useState([]);
  const [atoz, setatoz] = useState(true);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-cg-demo-api-key": "CG-PyRvXUMXcFVqbTgCszAN4FUK",
    },
  };

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd",
      options
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setCoins(res);
        setFilterCoins(res); // Initialize filtered coins when data is fetched
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSort = (key) => {
    const sortedCoins = [...filterCoins].sort((a, b) => {
      if (key === "name") {
        return atoz
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else {
        return atoz ? a[key] - b[key] : b[key] - a[key];
      }
    });

    setFilterCoins(sortedCoins);
    setatoz(!atoz);
  };

  return (
    <>
      <h1>Cryptocurrency Market</h1>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort("name")}>▲▼ Name </th>
              <th className="sticky-column">Image</th>
              <th onClick={() => handleSort("current_price")}>
                ▲▼ Current Price ($)
              </th>
              <th>24h High ($)</th>
              <th>24h Low ($)</th>
              <th onClick={() => handleSort("price_change_24h")}>
                ▲▼ Price Change (24h) ($)
              </th>
              <th onClick={() => handleSort("price_change_percentage_24h")}>
                ▲▼ Price Change Percentage (24h) (%)
              </th>
            </tr>
          </thead>
          <tbody>
            {filterCoins.map((coin, index) => (
              <Coin key={index} coin={coin} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
