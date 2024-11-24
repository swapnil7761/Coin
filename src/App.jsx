import "./App.css";
import Homepage from "./pages/Homepage";
import Coindetail from "./pages/Coindetail";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import BrowserRouter
import Exchange from "./pages/Exchange";
import Products from "./pages/Products";

function App() {
  return (
    <Router>
      {/* Wrap your routes in the Router component */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        {/* Set the path to "/" for Homepage */}
        <Route path="/coin/:id" element={<Coindetail />} />
        {/* Set path for Coindetail */}
        <Route path="/exchange" element={<Exchange />} />
        <Route path="/products/convertor" element={<Products />} />
      </Routes>
    </Router>
  );
}

export default App;
