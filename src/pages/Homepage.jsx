import { useEffect, useState, useMemo, useCallback } from "react";
import Cointable from "../component/coin/Cointable";
import Tranding from "../component/coin/Tranding";
import Sidedata from "../component/coin/Sidedata";
import Headtext from "../component/main/Headtext";
import Headbar from "../component/main/Headbar";
import Footer from "../component/main/Footer";
import Newsletter from "../component/main/Newsletter";
import CryptoMarquee from "../component/products/CryptoMarquee";

function Homepage() {
  const [allCoins, setAllCoins] = useState([]); // Store all coins for trending and initial data
  const [filterCoins, setFilterCoins] = useState([]); // Filtered list for search and sort only
  const [globaldata, setGlobaldata] = useState({});
  const [atoz, setAtoz] = useState(true);
  const [filterTop, setFilterTop] = useState(null);
  const [search, setSearch] = useState("");

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
        setAllCoins(res);
        setFilterCoins(res);
      })
      .catch((err) => console.error("Failed to fetch coins:", err));

    fetch("https://api.coingecko.com/api/v3/global", options)
      .then((res) => res.json())
      .then((res) => {
        setGlobaldata(res.data);
      })
      .catch((err) => console.error("Failed to fetch global data:", err));
  }, []);

  useEffect(() => {
    if (Object.keys(globaldata).length !== 0) {
    }
  }, [globaldata]);

  const handleSort = useCallback(
    (key) => {
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
    },
    [atoz, filterCoins]
  );

  const gainer = useMemo(() => {
    return [...allCoins]
      .sort(
        (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
      )
      .slice(0, 6);
  }, [allCoins]);

  const loser = useMemo(() => {
    return [...allCoins]
      .sort(
        (a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h
      )
      .slice(0, 6);
  }, [allCoins]);

  const Volume = useMemo(() => {
    return [...allCoins]
      .sort((a, b) => b.total_volume - a.total_volume)
      .slice(0, 6);
  }, [allCoins]);

  const trandingArr = useMemo(
    () => [
      { type: gainer, heading: "Top Gainers" },
      { type: loser, heading: "Top Losers" },
      { type: Volume, heading: "Top Volume" },
    ],
    [gainer, loser, Volume]
  );

  const handleTrandingClick = useCallback(
    (key) => {
      if (key === "volume") {
        setFilterTop(trandingArr[2]);
      } else if (key === "loss") {
        setFilterTop(trandingArr[1]);
      } else {
        setFilterTop(trandingArr[0]);
      }
    },
    [trandingArr]
  );
  const handleSearchinput = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const searchResults = search
      ? allCoins.filter(
          (coin) =>
            coin.name.toLowerCase().includes(search.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(search.toLowerCase())
        )
      : allCoins;
    setFilterCoins(searchResults);
  }, [search, allCoins]);

  return (
    <>
      <Headbar handleSearchinput={handleSearchinput} search={search} />
      <CryptoMarquee allcoins={allCoins} />
      <Headtext />
      <div className="trandingSection">
        <div className="trandingcoins">
          <div className="trandingbtns">
            <div onClick={() => handleTrandingClick("gain")}>
              <i class="fi fi-rr-fire-flame-curved"></i>
            </div>
            <div onClick={() => handleTrandingClick("loss")}>
              <i class="fi fi-rs-arrow-trend-down"></i>
            </div>
            <div onClick={() => handleTrandingClick("volume")}>v</div>
          </div>
          {(filterTop ? [filterTop] : [trandingArr[0]]).map((c, index) => (
            <Tranding key={index} Coins={c.type} title={c.heading} />
          ))}
        </div>
        <Sidedata globaldata={globaldata} />
      </div>
      {filterCoins.length > 0 ? (
        <Cointable handleSort={handleSort} filterCoins={filterCoins} />
      ) : (
        <p
          style={{
            margin: "0  45%",
            color: "gray",
            overflow: "visible",
            textWrap: "nowrap",
          }}
        >
          No match found
        </p>
      )}
      <Newsletter />
      <Footer />
    </>
  );
}

export default Homepage;
