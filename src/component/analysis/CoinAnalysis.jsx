import React, { useState } from "react";
import axios from "axios";
import s from "./CoinAnalysis.module.css";

const CoinAnalysis = ({ coin }) => {
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const prewrittenprompt = `USE THIS PROMT FOR ${coin.name} AND GIVE latest MARKET ANALYSIS (VISIT minimum 10 SITES) RESPONSE IN SAME JSON OBJECT FORMAT-{       
  "recommendation": "Buy, hold, or sell (based on current analysis)",
  "entry_exit_prices": {
    "entry_price": "Suggested entry price and when it will occur", 
    "exit_price": "Suggested exit price and when it will occur" 
  },
  "projected_growth": {
    "short_term": "Projected short-term growth",
    "long_term": "Projected long-term growth"
  },
  "risk_analysis": {
    "volatility": "Current market volatility",
    "whale_activity": "Current whale activity and institutional investment level",
    "regulatory_risks": "Any regulatory risks",
    "market_disruptions": "Any potential market disruptions"
  },
  "market_sentiment": "Analyze the overall market sentiment, including recent news, investor outlook, and broader market trends",
  "latest_news": [
    {
      "headline": "Latest relevant news headline with date", 
      "date": "Date of the news",
      "impact": "How the news has impacted the asset’s price movement in in detail for 3 line",
      "source": "Source of the news", "url":"url of the news which is listed here" 
    },
    {
      "headline": "Latest relevant news headline that created spike in price with date", 
      "date": "Date of the news",
      "impact": "How the news has impacted the asset’s price movement in detail for 3 line", 
      "source": "Source of the news", "url":"url of the news which is listed here" 
    },
    {
      "headline": "Additional relevant news headline with date", 
      "date": "Date of the news",
      "impact": "How this news affects the market sentiment in in detail for 3 line",
      "source": "Source of the news", "url":"url of the news which is listed here" 
    },{
      "headline": "Additional relevant news headline with date", 
      "date": "Date of the news",
      "impact": "How this news affects the market sentiment in in detail for 3 line",
      "source": "Source of the news", "url":"url of the news which is listed here" 
    },{
      "headline": "Additional relevant news headline with date", 
      "date": "Date of the news",
      "impact": "How this news affects the market sentiment in in detail for 3 line",
      "source": "Source of the news", "url":"url of the news which is listed here" 
    }
  ]
  }`;
  const fetchCoinAnalysis = async () => {
    setLoading(true);
    setError(null);

    try {
      const apiEndpoint = "https://api.openai.com/v1/completions"; // OpenAI's GPT endpoint for example
      const apiKey = "your-api-key"; // Replace with your API key

      const requestBody = {
        model: "text-davinci-003",
        prompt: prewrittenprompt,
        max_tokens: 600,
        temperature: 0.7,
      };
      const response = await axios.post(apiEndpoint, requestBody, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      });
      setResponseData(response.data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching data");
      setLoading(false);
    }
  };
  const dummy = () => {
    setResponseData({
      recommendation: "Hold",
      entry_exit_prices: {
        entry_price:
          "₹240-250, expected if the stock faces short-term corrections or market dips.",
        exit_price:
          "₹280, expected if market sentiment improves and stock reaches forecasted high.",
      },
      projected_growth: {
        short_term:
          "Zomato's stock has seen a 111% growth in 2024, with an upward trend expected to continue as the company expands its market share in India, particularly in non-metro cities and quick-commerce sectors.",
        long_term:
          "Zomato's long-term growth looks promising with diversification into quick-commerce and intercity food delivery, which is expected to drive significant growth.",
      },
      risk_analysis: {
        volatility:
          "High volatility as Zomato faces competition from Swiggy and other players in the food delivery sector.",
        whale_activity:
          "Institutional investment is significant, with Zomato's market share growing, especially in Southern India.",
        regulatory_risks:
          "There are some concerns regarding the competitive pressures in the quick-commerce market, which may impact profitability in the short term.",
        market_disruptions:
          "Zomato's expansion into new markets and services could be disrupted by economic downturns or increased competition from new entrants.",
      },
      market_sentiment:
        "Market sentiment is currently positive, with analysts projecting significant growth due to Zomato's strong performance in 2024 and the ongoing expansion into new markets like grocery and intercity food delivery.",
      latest_news: [
        {
          headline:
            "Zomato’s stock rises 111% in 2024, analysts forecast growth despite competition, Aug 2024",
          date: "2024-08-16",
          impact:
            "The stock's growth is attributed to Zomato's market leadership in food delivery, despite challenges from competitors. Positive earnings and market share gains are driving optimism.",
          source: "Live Mint",
          url: "https://www.livemint.com",
        },
        {
          headline:
            "Zomato reports record net profit growth of 126.5 times for Q1FY25, Aug 2024",
          date: "2024-08-16",
          impact:
            "Zomato’s strong financial performance, with record profits and revenue growth, boosted investor confidence and further strengthened the stock price.",
          source: "Live Mint",
          url: "https://www.livemint.com",
        },
        {
          headline:
            "Zomato’s market share in food delivery rises to 55%, surpassing Swiggy, Aug 2024",
          date: "2024-08-16",
          impact:
            "Zomato’s gain in market share highlights its growing dominance in India's food delivery market, signaling future growth potential.",
          source: "Analytics Insight",
          url: "https://www.analyticsinsight.net",
        },
        {
          headline:
            "Zomato’s entry into grocery and intercity food delivery boosts long-term prospects, Aug 2024",
          date: "2024-08-16",
          impact:
            "The company’s expansion into grocery delivery and intercity services is set to diversify revenue streams, strengthening its growth outlook.",
          source: "Analytics Insight",
          url: "https://www.analyticsinsight.net",
        },
        {
          headline:
            "Zomato’s valuation concerns amid competition: Should you buy or hold? Aug 2024",
          date: "2024-08-16",
          impact:
            "Zomato’s high valuation raises concerns about sustainability, but analysts suggest holding for long-term gains despite competitive pressures.",
          source: "Live Mint",
          url: "https://www.livemint.com",
        },
      ],
    });
  };

  return (
    <div className={`${s.analysisdiv} container`}>
      <h2>Comprehensive Market Analysis for {coin.name}</h2>
      <button onClick={dummy} disabled={loading}>
        {loading ? "Loading..." : "Get Coin Analysis"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {responseData && (
        <div className={`${s.marketanalysis}`}>
          <h1 className="title">Investment Insights for Maker (MKR)</h1>

          {/* Investment Recommendation */}
          <div className={s.section}>
            <h2>Investment Recommendation</h2>
            <p>
              Our analysis suggests a{" "}
              <strong>{responseData.recommendation}</strong>
              approach based on current governance trends and market
              performance.
            </p>
          </div>

          {/* Strategic Entry and Exit Points */}
          <div className={s.section}>
            <h2>Strategic Entry and Exit Points</h2>
            <p>
              <strong>Entry Price:</strong>{" "}
              {responseData.entry_exit_prices.entry_price}
              <br />
              <em>
                (Optimal entry predicted within short-term trend reversals.)
              </em>
            </p>
            <p>
              <strong>Exit Price:</strong>{" "}
              {responseData.entry_exit_prices.exit_price}
              <br />
              <em>(Ideal exit for maximizing returns on current cycles.)</em>
            </p>
          </div>

          {/* Short and Long-Term Growth Potential */}
          <div className={s.section}>
            <h2>Short and Long-Term Growth Potential</h2>
            <p>
              <strong>Short-Term:</strong>{" "}
              {responseData.projected_growth.short_term}
              <br />
              <em>Key drivers: DeFi adoption spikes and governance rewards.</em>
            </p>
            <p>
              <strong>Long-Term:</strong>{" "}
              {responseData.projected_growth.long_term}
              <br />
              <em>
                Predicted from DAI ecosystem growth and institutional interest.
              </em>
            </p>
          </div>

          {/* Comprehensive Risk Profile */}
          <div className={s.section}>
            <h2>Comprehensive Risk Profile</h2>
            <ul>
              <li>
                <strong>Market Volatility:</strong>{" "}
                {responseData.risk_analysis.volatility}
                <br />
                <em>
                  Driven by Ethereum network congestion and price corrections.
                </em>
              </li>
              <li>
                <strong>Whale Activity:</strong>{" "}
                {responseData.risk_analysis.whale_activity}
                <br />
                <em>
                  Highlighted by recent whale purchases influencing price.
                </em>
              </li>
              <li>
                <strong>Regulatory Risks:</strong>{" "}
                {responseData.risk_analysis.regulatory_risks}
                <br />
                <em>
                  Potential concerns include stablecoin policies and DeFi
                  regulations.
                </em>
              </li>
              <li>
                <strong>Market Disruptions:</strong>{" "}
                {responseData.risk_analysis.market_disruptions}
                <br />
                <em>
                  Includes network updates and macroeconomic fluctuations.
                </em>
              </li>
            </ul>
          </div>

          {/* Overall Sentiment and Market Trends */}
          <div className={s.section}>
            <h2>Overall Market Sentiment and Trends</h2>
            <p>
              {responseData.market_sentiment
                .split("&#8203;")
                .join("")
                .replace(/:contentReference\[oaicite:\d+\]\{index=\d+\}/g, "")
                .trim()}
            </p>
            <p>
              <em>
                Factors: Rising DAI adoption and steady DeFi sector performance.
              </em>
            </p>
          </div>

          {/* Breaking News and Key Updates */}
          <div className={s.section}>
            <h2>Breaking News and Key Updates</h2>
            {responseData.latest_news.map((news, index) => (
              <div key={index} className={s.newsitem}>
                <div className={s.newshead}>
                  <p>
                    <strong>Source:</strong>
                    <a href={news.url}>
                      {news.source.includes("&")
                        ? news.source.slice(0, news.source.indexOf("&"))
                        : news.source}
                    </a>
                  </p>
                  <p>{news.date}</p>
                </div>
                <h3>{news.headline}</h3>
                <p>
                  <strong>Impact:</strong> {news.impact}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CoinAnalysis;
