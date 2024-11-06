import React, { useState, useEffect } from "react";

const Tweets = () => {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Your API Key from NewsAPI
  const API_KEY = "fcac6b01b3b54370afd5fb1d96884eec"; // Replace with your actual API key

  // The query string for crypto-related news
  const query = "crypto OR #cryptocurrency OR #bitcoin OR #ethereum";

  // Endpoint with the query and your API key
  const url = `/v2/everything?q=${query}&from=2024-11-06&sortBy=popularity&apiKey=${API_KEY}`;

  useEffect(() => {
    // Fetching news data from NewsAPI
    const fetchNews = async () => {
      try {
        const response = await fetch(url, {
          method: "GET", // Using GET method for the request
        });

        const data = await response.text(); // Read response as text first

        // Check if the response is a valid JSON
        try {
          const jsonData = JSON.parse(data); // Try parsing the response as JSON
          if (response.ok) {
            setTweets(jsonData.articles); // Save the articles in state
          } else {
            setError("Error fetching data: " + jsonData.message); // Handle API errors
          }
        } catch (err) {
          setError("Invalid JSON response: " + data); // Log non-JSON responses
        }
      } catch (error) {
        setError("Error fetching data: " + error.message); // Catch any errors during fetch
      } finally {
        setLoading(false); // Set loading to false when data is fetched
      }
    };

    fetchNews(); // Call the fetch function
  }, []); // Empty dependency array to run only on mount

  if (loading) {
    return <div>Loading crypto news...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h3>Recent Crypto Market News</h3>
      {tweets && tweets.length > 0 ? (
        tweets.map((tweet, index) => (
          <div key={index}>
            <h4>{tweet.title}</h4>
            <p>{tweet.description}</p>
            <a href={tweet.url} target="_blank" rel="noopener noreferrer">
              Read more
            </a>
            <hr />
          </div>
        ))
      ) : (
        <p>No news found.</p>
      )}
    </div>
  );
};

export default Tweets;
