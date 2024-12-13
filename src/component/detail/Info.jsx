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
      {coin.description.en ? (
        <p
          className={`description ${isExpanded ? "expanded" : "collapsed"}`}
          dangerouslySetInnerHTML={{ __html: coin.description.en }}
        />
      ) : (
        <>
          <h2>ERROR:404</h2>
          "Information not avialable right now."
        </>
      )}
    </div>
  );
};

export default Info;
