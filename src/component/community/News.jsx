import React from "react";
import s from "./News.module.css";
import Loading from "../loading/Loading";
import { useState, useEffect } from "react";

const News = ({ coinid }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const fromDate = oneWeekAgo.toISOString().split("T")[0];

  useEffect(() => {
    const dynmiculr = coinid || "cryptocurrency";

    fetch(
      `https://newsapi.org/v2/everything?q=${dynmiculr}&from=${fromDate}&to=${today}&sortBy=popularity&apiKey=fcac6b01b3b54370afd5fb1d96884eec`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data && data.articles && Array.isArray(data.articles)) {
          setNews(data.articles);
        } else {
          setError("No news data found");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching news");
        setLoading(false);
      });
  }, [coinid]);

  const headnews = news[0];
  const morenews = news.slice(1, 4);
  const formatDate = (date) => new Date(date).toLocaleDateString();
  return (
    <>
      {news && news.length > 0 ? (
        <div className={`${s.newssection} container`}>
          <div className={s.newssectionheading}>
            {coinid ? (
              <h1>Latest News related to {coinid}</h1>
            ) : (
              <h1>Latest Crypto News</h1>
            )}
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
        <Loading />
      )}
    </>
  );
};

export default News;
