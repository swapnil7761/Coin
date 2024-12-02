import "./App.css";
import Homepage from "./pages/Homepage";
import Coindetail from "./pages/Coindetail";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import BrowserRouter
import Exchange from "./pages/Exchange";
import Products from "./pages/Products";
import Community from "./pages/Community";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/coin/:id" element={<Coindetail />} />
        <Route path="/exchange" element={<Exchange />} />
        <Route path="/community" element={<Community />} />
        <Route path="/products/convertor" element={<Products />} />
      </Routes>
    </Router>
  );
}

export default App;
