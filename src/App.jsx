import "./App.css";
import { useState, useEffect } from "react";
import Headbar from "./component/main/Headbar";
import CryptoMarquee from "./component/products/CryptoMarquee";
import Newsletter from "./component/main/Newsletter";
import Footer from "./component/main/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Coindetail from "./pages/Coindetail";
import Community from "./pages/Community";
import Exchange from "./pages/Exchange";
import Products from "./pages/Products";
import Loading from "./component/loading/Loading";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import ParticleEffect from "./component/products/ParticleEffect";

function App() {
  const [allCoins, setAllCoins] = useState([]);
  const [globaldata, setGlobaldata] = useState({});
  const [search, setSearch] = useState("");
  const [filterCoins, setFilterCoins] = useState([]);

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

  useGSAP(() => {}, []);

  return (
    <>
      <Router>
        <Headbar handleSearchinput={handleSearchinput} search={search} />
        <CryptoMarquee allcoins={allCoins} />
        <div className="updatedatatime">
          <div>@coinmarketcap</div>
          <div>updated at: {Date(globaldata.updated_at)}</div>
        </div>
        {/* <Loading /> */}
        <ParticleEffect />
        <Routes>
          <Route
            path="/"
            element={
              <Homepage
                allCoins={allCoins}
                filterCoins={filterCoins}
                setFilterCoins={setFilterCoins}
                globaldata={globaldata}
              />
            }
          />
          <Route
            path="/coin/:id"
            element={<Coindetail setFilterCoins={setFilterCoins} />}
          />
          <Route path="/exchange" element={<Exchange />} />
          <Route path="/community" element={<Community />} />
          <Route path="/products/convertor" element={<Products />} />
        </Routes>
        <Newsletter />
        <Footer />
      </Router>
    </>
  );
}

export default App;
