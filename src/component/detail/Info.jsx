import React, { useState } from "react";

const Info = ({ coin }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`infosection container ${
        isExpanded ? "expanded" : "collapsed"
      }`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <h1>About {coin.id}</h1>
      <p
        className={`description ${isExpanded ? "expanded" : "collapsed"}`}
        dangerouslySetInnerHTML={{ __html: coin.description.en }}
      />
    </div>
  );
};

export default Info;
