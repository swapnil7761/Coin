import React, { useEffect, useState, useCallback } from "react";
import Headbar from "../component/main/Headbar";
import Exchangetable from "../component/exchage/Exchangetable";
import Footer from "../component/main/Footer";
import Newsletter from "../component/main/Newsletter";
import CryptoMarquee from "../component/products/CryptoMarquee";

const Exchange = () => {
  document.title = "Top Crypto currency Exchanges";

  const [exchange, setExchange] = useState([]);
  const [filterexchange, setFilterexchange] = useState([]);
  const [atoz, setAtoz] = useState(true);
  const [error, setError] = useState(null);
  const [allCoins, setAllCoins] = useState([]);

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

    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&sparkline=true&price_change_percentage=1h%2C7d",
      options
    )
      .then((res) => res.json())
      .then((res) => {
        setAllCoins(res);
      })
      .catch((err) => console.error("Failed to fetch coins:", err));
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
      <Headbar />
      <CryptoMarquee allcoins={allCoins} />
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
