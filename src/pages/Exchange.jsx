import { useEffect, useState, useCallback } from "react";
import Exchangetable from "../component/exchage/Exchangetable";

const Exchange = () => {
  document.title = "Top Crypto currency Exchanges";

  const [exchange, setExchange] = useState([]);
  const [filterexchange, setFilterexchange] = useState([]);
  const [atoz, setAtoz] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = "https://api.coingecko.com/api/v3/exchanges?per_page=120";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-PyRvXUMXcFVqbTgCszAN4FUK",
      },
    };
    fetch(url, options)
      .then((res) => res.json())
      .then((json) => setExchange(json))
      .catch((err) => setError("Failed to load data"));
  }, []);

  const handleSort = useCallback(
    (key) => {
      const sortedexchange = [
        ...(filterexchange.length ? filterexchange : exchange),
      ].sort((a, b) => {
        const valueA = a[key] || (typeof a[key] === "string" ? "" : 0);
        const valueB = b[key] || (typeof b[key] === "string" ? "" : 0);

        if (typeof valueA === "string" && typeof valueB === "string") {
          return atoz
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA);
        }

        return atoz ? valueA - valueB : valueB - valueA;
      });

      setFilterexchange(sortedexchange);
      setAtoz(!atoz);
    },
    [atoz, exchange, filterexchange]
  );

  if (error) {
    return <p>{error}</p>;
  }

  if (!exchange.length) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="exchangeheading">
        <h2>Top Cryptocurrency Spot Exchanges</h2>{" "}
        <p>
          CoinMarketCap ranks and scores exchanges based on traffic, liquidity,
          trading volumes, and confidence in the legitimacy of trading volumes
          reported.Read More
        </p>
      </div>
      <Exchangetable
        exchange={exchange}
        filterexchange={filterexchange}
        handleSort={handleSort}
      />
    </>
  );
};

export default Exchange;
