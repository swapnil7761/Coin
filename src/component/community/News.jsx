import React from "react";
import s from "./News.module.css";

const News = ({ news }) => {
  if (!news || news.length === 0) {
    return <div>Loading...</div>; // Show a styled placeholder
  }

  const headnews = news[0];
  const morenews = news.slice(1, 4);

  const formatDate = (date) => new Date(date).toLocaleDateString();
  return (
    <>
      {news && news.length > 0 ? (
        <div className={s.newssection}>
          <div className={s.newssectionheading}>
            <h1>Latest Crypto News</h1>
            <p>
              Aggregated by <a href="https://newsapi.org/">NewsApi</a>
            </p>
          </div>
          <div className={s.headnews}>
            <div>
              <img
                src={headnews.urlToImage || "ad.png"}
                alt={headnews.title || "News image"}
                className={s.headnewsimg}
              />
            </div>
            <div>
              <h2>
                <a href={headnews.url}>{headnews.title}</a>
              </h2>
              <p>{headnews.description}</p>
              <p className={s.source}>
                -{headnews.source.name}{" "}
                <span>{formatDate(headnews.publishedAt)}</span>
              </p>
            </div>
          </div>
          <div className={s.morenews}>
            {morenews.map((news, index) => (
              <div key={index} className={s.morenewsdiv}>
                <div className={s.morenewshead}>
                  <h3>
                    <a href={news.url}>{news.title}.</a>
                  </h3>
                  <div>
                    <p className={s.source}>-{news.source.name}</p>
                    <p>
                      <span>{formatDate(news.publishedAt)}</span>
                    </p>
                  </div>
                </div>
                <div className={s.morenewsimgdiv}>
                  <img
                    src={news.urlToImage || "ad.png"}
                    alt={news.title || "News image"}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default News;
