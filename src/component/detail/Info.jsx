import React, { useState } from "react";

const Info = ({ coin }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`infosection container ${
        isExpanded ? "expanded" : "collapsed"
      }`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <h1>
        About
        {"  " + coin.id}
      </h1>
      <p dangerouslySetInnerHTML={{ __html: coin.description.en }} />
    </div>
  );
};

export default Info;
