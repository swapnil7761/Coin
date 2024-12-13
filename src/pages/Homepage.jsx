import { useState, useEffect, useMemo, useCallback } from "react";
import Headtext from "../component/main/Headtext";
import Tranding from "../component/coin/Tranding";
import Sidedata from "../component/coin/Sidedata";
import Cointable from "../component/coin/Cointable";

function Homepage({ allCoins, globaldata, filterCoins }) {
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

  return (
    <>
      <Headtext globaldata={globaldata} />
      <div className="trandingSection">
        <div className="trandingcoins">
          <div className="trandingbtns">
            <div onClick={() => handleTrandingClick("gain")}>
              <i className="fi fi-rr-fire-flame-curved"></i>
            </div>
            <div onClick={() => handleTrandingClick("loss")}>
              <i className="fi fi-rs-arrow-trend-down"></i>
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
        <div>
          <div
            className="container"
            style={{
              maxWidth: "1265px",
              width: "calc(100% - 20px)",
              justifySelf: "center",
            }}
          >
            <p
              style={{
                color: "gray",
                fontSize: "24px",
                justifySelf: "center",
                margin: "20px 0",
                color: "tomato",
              }}
            >
              ... No match found ...
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default Homepage;
