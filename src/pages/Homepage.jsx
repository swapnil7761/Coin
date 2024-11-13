import { useEffect, useState } from "react";
import Cointable from "../component/coin/Cointable";
import Tranding from "../component/coin/Tranding";
import Sidedata from "../component/coin/Sidedata";

function Homepage() {
  const [filterCoins, setFilterCoins] = useState([]);
  const [globaldata, setGlobaldata] = useState({});
  const [atoz, setAtoz] = useState(true);
  const [filterTop, setFilterTop] = useState(null);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-cg-demo-api-key": "CG-PyRvXUMXcFVqbTgCszAN4FUK",
    },
  };

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&sparkline=true&price_change_percentage=1h%2C7d",
      options
    )
      .then((res) => res.json())
      .then((res) => {
        setFilterCoins(res); // Initialize filtered coins when data is fetched
      })
      .catch((err) => console.error(err));

    fetch("https://api.coingecko.com/api/v3/global", options)
      .then((res) => res.json())
      .then((res) => {
        setGlobaldata(res.data); // Set the global data
      })
      .catch((err) => console.error(err));
  }, []);

  // Log the global data once it's set
  useEffect(() => {
    if (Object.keys(globaldata).length !== 0) {
      console.log(globaldata);
    }
  }, [globaldata]); // This useEffect will run whenever globaldata changes

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
    setAtoz(!atoz);
  };

  const gainer = [...filterCoins]
    .sort(
      (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
    )
    .slice(0, 6);
  const loser = [...filterCoins]
    .sort(
      (a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h
    )
    .slice(0, 6);
  const Volume = [...filterCoins]
    .sort((a, b) => b.total_volume - a.total_volume)
    .slice(0, 6);

  const trandingArr = [
    { type: gainer, heading: "Top Gainers" },
    { type: loser, heading: "Top Losers" },
    { type: Volume, heading: "Top Volume" },
  ];

  const handleTrandingClick = (key) => {
    if (key === "volume") {
      setFilterTop(trandingArr[2]);
    } else if (key === "loss") {
      setFilterTop(trandingArr[1]);
    } else {
      setFilterTop(trandingArr[0]);
    }
  };

  return (
    <>
      <h1>Cryptocurrency Market</h1>
      <div className="trandingSection">
        <div className="trandingcoins">
          <div className="trandingbtns">
            <div onClick={() => handleTrandingClick("gain")}>g</div>
            <div onClick={() => handleTrandingClick("loss")}>l</div>
            <div onClick={() => handleTrandingClick("volume")}>v</div>
          </div>
          {(filterTop ? [filterTop] : [trandingArr[0]]).map((c, index) => (
            <Tranding key={index} Coins={c.type} title={c.heading} />
          ))}
        </div>
        <Sidedata globaldata={globaldata} />
      </div>
      <Cointable handleSort={handleSort} filterCoins={filterCoins} />
    </>
  );
}

export default Homepage;
