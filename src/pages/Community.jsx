import { useState, useEffect } from "react";
import News from "../component/community/News";
import Newstab from "../component/community/Newstab";

const Community = () => {
  const [news, setNews] = useState([]);
  const [newstab, setNewstab] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get today's date and 1 week ago date in the required format
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const fromDate = oneWeekAgo.toISOString().split("T")[0]; // YYYY-MM-DD format

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-cg-demo-api-key": "CG-PyRvXUMXcFVqbTgCszAN4FUK",
    },
  };

  // Fetch news data from CryptoPanic API
  useEffect(() => {
    fetch(
      `https://newsapi.org/v2/everything?q=bitcoin&from=${fromDate}&to=${today}&sortBy=popularity&apiKey=fcac6b01b3b54370afd5fb1d96884eec`
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

    fetch(
      `https://api.allorigins.win/raw?url=https://cryptopanic.com/api/v1/posts/?auth_token=1b73a6abf05f8014869e69a97913a9e69397929e&currencies=BTC,ETH&from=${fromDate}&to=${today}`
    )
      .then((response) => response.json())
      .then((data) => {
        setNewstab(data.results);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching news");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <News news={news} />
      <Newstab newstab={newstab} />
    </>
  );
};

export default Community;
