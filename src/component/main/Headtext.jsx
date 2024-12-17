import Loading from "../loading/Loading";

const Headtext = ({ globaldata }) => {
  const formatNumber = (number) => {
    return new Intl.NumberFormat().format(number);
  };
  const getPercentageChange = (value) => {
    return value != null ? Math.abs(value.toFixed(2)) : "N/A";
  };

  return (
    <div className="headintro container">
      <div className="headinfo">
        <h2> Today's Cryptocurrency Prices by Market Cap</h2>
        {globaldata ? (
          <>
            <p>
              The global crypto market cap is{" "}
              <span className="bold">$3.63T</span> , a{" "}
              {
                <span
                  className={
                    globaldata.market_cap_change_percentage_24h_usd >= 0
                      ? "green"
                      : "red"
                  }
                >
                  <span className={"updown"}>
                    {globaldata.market_cap_change_percentage_24h_usd >= 0
                      ? "▲"
                      : "▼"}
                  </span>
                  {getPercentageChange(
                    globaldata.market_cap_change_percentage_24h_usd
                  )}
                  %
                </span>
              }
              {globaldata.market_cap_change_percentage_24h_usd >= 0
                ? " increase "
                : " decrease "}
              over the last day.
            </p>
            <p>
              The total crypto market volume over the last 24 hours is{" "}
              <span className="bold">$218.34B</span>, which makes a
              {
                <span className={-20.68 >= 0 ? "green" : "red"}>
                  <span className={"updown"}>{-20.68 >= 0 ? "▲" : "▼"}</span>
                  {getPercentageChange(20.68)}%
                </span>
              }
              {-20.68 >= 0 ? " increase " : " decrease "}. The total volume in
              DeFi is currently <span className="bold">$18.86B, 8.64%</span> of
              the total crypto market 24-hour volume. The volume of all stable
              coins is now <span className="bold">$202.21B</span>, which is
              <span className="bold"> 92.61% </span> of the total crypto market
              24-hour volume.
            </p>
          </>
        ) : (
          <Loading />
        )}
      </div>
      {/* <div className="headinfoad">
        <a href="https://tars.pro/" target="_blank">
          <img src="ad.jpg" />
          <div className="adtag">Ad</div>
        </a>
      </div> */}
    </div>
  );
};

export default Headtext;
