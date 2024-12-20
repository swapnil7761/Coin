import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Headbar = ({ handleSearchinput, search }) => {
  const [burgeron, setBurgeron] = useState(false);
  return (
    <div className="head">
      <div className="headmenu">
        <div className="headlogo">
          <Link to={`/`} target="_self" rel="noopener noreferrer">
            <img src="/coinlogoblack.png" alt="" />
          </Link>
        </div>
        <div className="headnavbar">
          <div className="burgermenu">
            <button
              onClick={() => {
                setBurgeron(!burgeron);
                console.log(burgeron);
              }}
            >
              burger
            </button>
          </div>
          <ul
            className={burgeron ? "burgervisibiltyon" : "burgervisibiltyoff "}
          >
            <li>
              <Link to={`/`} target="_self" rel="noopener noreferrer">
                Currency
              </Link>
            </li>
            <li>
              <Link to={`/exchange`} target="_self" rel="noopener noreferrer">
                Exchange
              </Link>
            </li>
            <li>
              <Link to={`/community`} target="_self" rel="noopener noreferrer">
                Community
              </Link>
            </li>
            <li>
              <Link
                to={`/products/convertor`}
                target="_self"
                rel="noopener noreferrer"
              >
                Products
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {handleSearchinput ? (
        <div className="searchsection">
          <p className="searchicon">⌕</p>
          <input
            type="text"
            value={search}
            onChange={handleSearchinput}
            placeholder="Crypto Name or ID"
          />
        </div>
      ) : null}
    </div>
  );
};

export default Headbar;
