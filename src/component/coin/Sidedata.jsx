import React from "react";
import Loading from "../loading/Loading";

const Sidedata = ({ globaldata }) => {
  // Handle cases where globaldata might not be defined yet
  if (!globaldata || !globaldata.market_cap_percentage) {
    return <Loading />;
  }

  // Safely access the values using optional chaining
  const btcPercentage = globaldata?.market_cap_percentage?.btc || 0;
  const ethPercentage = globaldata?.market_cap_percentage?.eth || 0;
  const othersPercentage = 100 - btcPercentage - ethPercentage;

  // Placeholder change values
  const btcChange = 1.45;
  const ethChange = 0.37;
  const othersChange = -1.82;

  const formatNumber = (number) => {
    return new Intl.NumberFormat().format(number);
  };

  return (
    <div className="sidedatacover">
      <div className="marketdata ">
        <div className="container">
          <h3>Total Market Capitalization</h3>
          <p>$ {formatNumber(globaldata.total_market_cap.usd.toFixed(0))}</p>
        </div>
        <div className="container">
          <h3>Total Volume </h3>
          <p>$ {formatNumber(globaldata.total_volume.usd.toFixed(0))}</p>
        </div>
      </div>
      <div className="dominancedatacover container">
        <h3 className="heading">Bitcoin Dominance</h3>
        <div className="dominance">
          {/* Bitcoin Segment */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                paddingBottom: "4px",
              }}
            >
              <div
                style={{
                  backgroundColor: "yellow",
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                }}
              ></div>
              <span className="segment-name">Bitcoin</span>
            </div>
            <span className="percentage">{btcPercentage.toFixed(2)}%</span>
            <div className="percentage-value">
              <p style={{ color: btcChange > 0 ? "green" : "red" }}>
                <span className={"updown"}>{btcChange >= 0 ? "▲" : "▼"}</span>
                {btcChange.toFixed(2)}%
              </p>
            </div>
          </div>
          {/* Ethereum Segment */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                paddingBottom: "4px",
              }}
            >
              <div
                style={{
                  backgroundColor: "gray",
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                }}
              ></div>
              <span className="segment-name">Ethereum</span>
            </div>
            <span className="percentage">{ethPercentage.toFixed(2)}%</span>
            <div className="percentage-value">
              <p style={{ color: ethChange > 0 ? "green" : "red" }}>
                <span className={"updown"}>{ethChange >= 0 ? "▲" : "▼"}</span>
                {ethChange.toFixed(2)}%
              </p>
            </div>
          </div>
          {/* Others Segment */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                paddingBottom: "4px",
              }}
            >
              <div
                style={{
                  backgroundColor: "tomato",
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                }}
              ></div>
              <span className="segment-name">Others</span>
            </div>
            <span className="percentage">{othersPercentage.toFixed(2)}%</span>
            <div className="percentage-value">
              <p style={{ color: othersChange > 0 ? "green" : "red" }}>
                <span className={"updown"}>
                  {othersChange >= 0 ? "▲" : "▼"}
                </span>
                {othersChange.toFixed(2)}%
              </p>
            </div>
          </div>
        </div>
        {/* Horizontal Bar */}
        <div
          className="dominancedatalength"
          style={{
            width: "100%",
            height: "8px",
            display: "flex",
          }}
        >
          {/* Bitcoin Segment */}
          <div
            style={{
              height: "100%",
              width: `${btcPercentage}%`,
              backgroundColor: "yellow",
              borderRadius: "10px 0 0 10px",
            }}
          />
          {/* Ethereum Segment */}
          <div
            style={{
              height: "100%",
              width: `${ethPercentage}%`,
              backgroundColor: "gray",
            }}
          />
          {/* Others Segment */}
          <div
            style={{
              height: "100%",
              width: `${othersPercentage}%`,
              backgroundColor: "tomato",
              borderRadius: "0 10px 10px 0",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidedata;
