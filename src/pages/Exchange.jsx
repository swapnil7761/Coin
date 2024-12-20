import { useEffect, useState, useCallback } from "react";
import Exchangetable from "../component/exchage/Exchangetable";
import Loading from "../component/loading/Loading";

const Exchange = () => {
  document.title = "Top Crypto currency Exchanges";

  const [exchange, setExchange] = useState([]);
  const [filterexchange, setFilterexchange] = useState([]);
  const [atoz, setAtoz] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = "https://api.coingecko.com/api/v3/exchanges?per_page=40";
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

  return (
    <>
      <div className="exchangeheading container">
        <h2>Top Cryptocurrency Spot Exchanges</h2>{" "}
        <p>
          CoinMarketCap ranks and scores exchanges based on traffic, liquidity,
          trading volumes, and confidence in the legitimacy of trading volumes
          reported.We now track 253 spot exchanges with a total 24h volume of
          $2.01T. For more info on exchange ranking,{" "}
          <a href="https://support.coinmarketcap.com/hc/en-us/articles/360052030111-Exchange-Ranking">
            click here
          </a>
          .
        </p>
        <p>
          Highly-ranked exchanges will possess the aforementioned traits and
          have markets that score well across Liquidity Scores, Volume, and Web
          Traffic Factor and have high Confidence scores.
        </p>
      </div>
      {exchange.length ? (
        <Exchangetable
          exchange={exchange}
          filterexchange={filterexchange}
          handleSort={handleSort}
        />
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Exchange;
