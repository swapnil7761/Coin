import { useEffect, useState } from "react";
import Headbar from "../component/main/Headbar";
import Convertor from "../component/products/Convertor";
import Footer from "../component/main/Footer";
import Newsletter from "../component/main/Newsletter";
import CryptoMarquee from "../component/products/CryptoMarquee";

const Products = () => {
  const [allCoins, setAllCoins] = useState([]);

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
      })
      .catch((err) => console.error("Failed to fetch coins:", err));
  }, []);
  return (
    <>
      <Headbar />
      <CryptoMarquee allcoins={allCoins} />
      <div className="productmaindiv">
        <div className="productheading">
          <h2>Cryptocurrency Converter Calculator</h2>
        </div>
        <Convertor />
      </div>
      <Newsletter />
      <Footer />
    </>
  );
};

export default Products;
