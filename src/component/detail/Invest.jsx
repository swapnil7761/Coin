import React, { useState } from "react";

const InvestmentAdvice = ({ coin }) => {
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to request investment advice from OpenAI
  const getInvestmentAdvice = async () => {
    setLoading(true);

    const prompt = `
        You are a financial analyst and advisor. Based on the following data for ${coin.name} (${coin.symbol}), predict detailed investment advice, including:

        - **Optimal entry price and exit price** for maximum returns over 3 months, 6 months, and 1 year.
        - **Risk analysis** based on price changes and market trends.
        - **Market sentiment** consideration in your recommendation.
        - **Profit estimation** for each period with a comparison to all-time high and low prices.

        The data:
        - Current price (USD): ${coin.market_data.current_price.usd}
        - Price change (24h): ${coin.market_data.price_change_percentage_24h}%
        - Price change (7d): ${coin.market_data.price_change_percentage_7d}%
        - Price change (14d): ${coin.market_data.price_change_percentage_14d}%
        - Price change (30d): ${coin.market_data.price_change_percentage_30d}%
        - Price change (60d): ${coin.market_data.price_change_percentage_60d}%
        - Price change (1y): ${coin.market_data.price_change_percentage_1y}%
        - All-time high price: ${coin.market_data.ath.usd} USD
        - All-time low price: ${coin.market_data.atl.usd} USD
        - 24-hour high: ${coin.market_data.high_24h.usd} USD
        - 24-hour low: ${coin.market_data.low_24h.usd} USD
        - Market cap rank: ${coin.market_cap_rank}
        - Total market cap: ${coin.market_data.market_cap.usd} USD
        - Volume (24h): ${coin.market_data.total_volume.usd} USD

        Please provide:
        1. **Investment Recommendation**: Should an investor buy, hold, or sell at the current price?
        2. **Entry and Exit Prices**: Recommended buy and sell prices for each period (3 months, 6 months, 1 year) for maximum potential return.
        3. **Expected Growth or Decline**: Projected price changes based on historical trends and the current market situation.
        4. **Market Sentiment and Risk Analysis**: Key factors affecting ${coin.name}'s price, including market sentiment, volatility, and external influences.
        5. **Profit Potential**: Estimated percentage return or profit for each period based on the suggested entry and exit prices.

        Generate a concise and actionable report with clear guidance for an investor looking at ${coin.name} over these timeframes.
        `;

    try {
      const response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer YOUR_OPENAI_API_KEY`,
        },
        body: JSON.stringify({
          model: "text-davinci-003",
          prompt: prompt,
          max_tokens: 200,
        }),
      });

      const data = await response.json();
      setAdvice(data.choices[0].text.trim());
    } catch (error) {
      console.error("Error fetching advice:", error);
      setAdvice("Failed to retrieve advice. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={getInvestmentAdvice} disabled={loading}>
        {loading ? "Fetching advice..." : "Get Investment Advice"}
      </button>
      {advice && <p>{advice}</p>}
    </div>
  );
};

export default InvestmentAdvice;
