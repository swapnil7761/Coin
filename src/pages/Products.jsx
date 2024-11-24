import React from "react";
import Headbar from "../component/main/Headbar";
import Convertor from "../component/products/Convertor";
import Footer from "../component/main/Footer";
import Newsletter from "../component/main/Newsletter";

const Products = () => {
  return (
    <>
      <Headbar />
      <div className="productheading">
        <h2>Cryptocurrency Converter Calculator</h2>
      </div>
      <Convertor />
      <Newsletter />
      <Footer />
    </>
  );
};

export default Products;
