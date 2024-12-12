import React from "react";
import { Link } from "react-router-dom";

const Headbar = ({ handleSearchinput, search }) => {
  return (
    <div className="head">
      <div className="headmenu">
        <div className="headlogo">
          <Link to={`/`} target="_self" rel="noopener noreferrer">
            <img src="/coinlogoblack.png" alt="" />
          </Link>
        </div>
        <div className="headnavbar">
          <ul>
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
