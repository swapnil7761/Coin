import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Detail from "../component/detail/Detail";
import Detailchart from "../component/detail/Detailchart";
import Info from "../component/detail/Info";
import CoinAnalysis from "../component/analysis/CoinAnalysis";
import Loading from "../component/loading/Loading";
import News from "../component/community/News";

const Coindetail = ({ setFilterCoins }) => {
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
    return <Loading />;
  }
  let supplyrate = (
    (coin.market_data.circulating_supply * 100) /
    coin.market_data.max_supply
  ).toFixed(1);

  return (
    <>
      <div className="detailpage">
        <Detail coin={coin} />
        <div className="detailpagemain">
          <Detailchart coin={coin} />
          <Info coin={coin} />
          <div style={{ margin: "-10px" }}>
            <News coinid={coin.name} />
          </div>
          <CoinAnalysis coin={coin} />
        </div>
      </div>
    </>
  );
};

export default Coindetail;
