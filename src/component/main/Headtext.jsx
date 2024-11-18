import React, { useState } from "react";

const Headtext = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="headtext">
      <p>
        Today's Indian crypto market is dynamic, with trending coins drawing
        attention. Watch for significant shifts as top gainers and losers
        emerge. Bitcoin's dominance continues to influence market sentiment.
      </p>
      <div className="searchsection">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default Headtext;
