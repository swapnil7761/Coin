import React, { useEffect, useState, useCallback } from "react";
import Headbar from "../component/main/Headbar";
import Exchangetable from "../component/exchage/Exchangetable";
import Footer from "../component/main/Footer";
import Newsletter from "../component/main/Newsletter";

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
        "x-cg-demo-api-key": "CG-PyRvXUMXcFVqbTgCszAN4FUK", // Replace with an environment variable in production
      },
    };
    fetch(url, options)
      .then((res) => res.json())
      .then((json) => setExchange(json))
      .catch((err) => setError("Failed to load data"));
  }, []);
  console.log(exchange);

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
      <Headbar />
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
      <Newsletter />
      <Footer />
    </>
  );
};

export default Exchange;
