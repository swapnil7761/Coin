import React from "react";
import s from "./Exchangetable.module.css";
import TrustScoreBar from "./TrustScoreBar"; // You can still use this component if you want a circle bar

const Exchangetable = ({ filterexchange = [], exchange, handleSort }) => {
  const data = filterexchange.length > 0 ? filterexchange : exchange;

  if (!data.length) {
    return <p>No exchanges available.</p>;
  }

  return (
    <div className="table-wrapper container">
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("trust_score_rank")}>#</th>
            <th className="sticky-column" onClick={() => handleSort("name")}>
              Exchange
            </th>
            <th onClick={() => handleSort("trade_volume_24h_btc")}>
              Trading Volume (24h)
            </th>
            <th onClick={() => handleSort("trust_score")}>Trust Score</th>
            <th onClick={() => handleSort("country")}>Country</th>
            <th onClick={() => handleSort("year_established")}>Established</th>
          </tr>
        </thead>
        <tbody>
          {data.map((ex, index) => (
            <tr key={index}>
              <td>{ex.trust_score_rank}</td>
              <td className={`sticky-column ${s.nameimg}`}>
                <a href={ex.url} target="_blank" rel="noopener noreferrer">
                  <img src={ex.image} alt={`${ex.name} logo`} />
                  <div>
                    <p>{ex.name}</p>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "gray",
                      }}
                    >
                      <i> {ex.id}</i>
                    </p>
                  </div>
                </a>
              </td>
              <td>{ex.trade_volume_24h_btc.toFixed(0)} BTC</td>
              <td className={s.trust}>
                <TrustScoreBar trust_score={ex.trust_score} />
              </td>
              <td className={s.country}>{ex.country}</td>
              <td className={s.year}>{ex.year_established}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Exchangetable;
