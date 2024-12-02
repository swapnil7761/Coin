import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Detail from "../component/detail/Detail";
import Detailchart from "../component/detail/Detailchart";
import Info from "../component/detail/Info";
import Headbar from "../component/main/Headbar";
import Footer from "../component/main/Footer";
import Newsletter from "../component/main/Newsletter";
import CoinAnalysis from "../component/analysis/CoinAnalysis";

const Coindetail = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null); // Set initial state to null
  const [allCoins, setAllCoins] = useState([]);
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-PyRvXUMXcFVqbTgCszAN4FUK",
      },
    };
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&sparkline=true&price_change_percentage=1h%2C7d",
      options
    )
      .then((res) => res.json())
      .then((res) => {
        setAllCoins(res);
        setFilterCoins(res);
        console.log(allCoins);
      })
      .catch((err) => console.error("Failed to fetch coins:", err));

    fetch(`https://api.coingecko.com/api/v3/coins/${id}`, options)
      .then((res) => res.json())
      .then((res) => setCoin(res))
      .catch((err) => console.error(err));
  }, [id]);
  useEffect(() => {
    if (coin) {
      document.title = `${
        coin.name
      } ${coin.symbol.toUpperCase()} - Crypto Details`;
    }
  }, [coin]);
  if (!coin) {
    return <div>Loading...</div>;
  }
  let supplyrate = (
    (coin.market_data.circulating_supply * 100) /
    coin.market_data.max_supply
  ).toFixed(1);

  return (
    <>
      <Headbar />
      <div className="detailpage">
        <Detail coin={coin} />
        <div className="detailpagemain">
          <Detailchart coin={coin} />
          <Info coin={coin} />
          <CoinAnalysis coin={coin} />
        </div>
      </div>

      <Newsletter />
      <Footer />
    </>
  );
};

export default Coindetail;
