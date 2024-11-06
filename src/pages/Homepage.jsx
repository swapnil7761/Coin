import { useEffect, useState } from "react";
import Cointable from "../component/coin/Cointable";
import Tranding from "../component/coin/Tranding";
import Tweets from "../component/community/Tweets";

function Homepage() {
  const [filterCoins, setFilterCoins] = useState([]);
  const [atoz, setatoz] = useState(true);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-cg-demo-api-key": "CG-PyRvXUMXcFVqbTgCszAN4FUK	",
    },
  };

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&sparkline=true&price_change_percentage=1h%2C7d",
      options
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setFilterCoins(res); // Initialize filtered coins when data is fetched
      })
      .catch((err) => console.error(err));
  }, []);

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
    console.log(sortedCoins);

    setatoz(!atoz);
  };

  return (
    <>
      <h1>Cryptocurrency Market</h1>
      <div className="trandingSection">
        <Tranding filterCoins={filterCoins} />
        {/* <Tweets /> */}
      </div>
      <Cointable handleSort={handleSort} filterCoins={filterCoins} />
    </>
  );
}

export default Homepage;
