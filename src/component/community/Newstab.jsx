import React, { useState } from "react";
import s from "./Newstab.module.css";

const Newstab = ({ newstab }) => {
  const [expanded, setExpanded] = useState(false);

  function timeAgo(publishedAt) {
    const publishedDate = new Date(publishedAt);
    const currentDate = new Date();

    const differenceInSeconds = Math.floor(
      (currentDate - publishedDate) / 1000
    );

    if (differenceInSeconds < 60) {
      return `${differenceInSeconds} seconds ago`;
    } else if (differenceInSeconds < 3600) {
      const minutes = Math.floor(differenceInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else if (differenceInSeconds < 86400) {
      const hours = Math.floor(differenceInSeconds / 3600);
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else {
      const days = Math.floor(differenceInSeconds / 86400);
      return `${days} day${days > 1 ? "s" : ""} ago`;
    }
  }

  return (
    <>
      <div
        className={s.tabsection}
        style={{
          maxHeight: expanded ? "none" : "300px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {newstab.map((tab, index) => (
          <div key={index} className={`container ${s.tabhead}`}>
            <h4>
              <a href={tab.url}>{tab.title}</a>
            </h4>
            <div className={s.tabsource}>
              <div className={s.tablinktime}>
                <a href={`https://${tab.source.domain}`}>{tab.source.title}</a>
                <span> {timeAgo(tab.published_at)}</span>
              </div>
              <div className={s.tablike}>♡ {tab.votes.liked}</div>
            </div>
          </div>
        ))}
        {!expanded && (
          <div className={s.gradientOverlay} onClick={() => setExpanded(true)}>
            <span className={s.expandText}>Show More</span>
          </div>
        )}
      </div>
    </>
  );
};

export default Newstab;
