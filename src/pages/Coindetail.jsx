import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Detail from "../component/detail/Detail";
import Detailchart from "../component/detail/Detailchart";
import Info from "../component/detail/Info";
import Headbar from "../component/main/Headbar";
import Footer from "../component/main/Footer";
import Newsletter from "../component/main/Newsletter";

const Coindetail = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null); // Set initial state to null

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-PyRvXUMXcFVqbTgCszAN4FUK",
      },
    };

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
  } // Display loading message while data is being fetched
  console.log(coin);

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
        </div>
      </div>
      <Newsletter />
      <Footer />
    </>
  );
};

export default Coindetail;
