import React, { useState } from "react";
import axios from "axios";
import s from "./CoinAnalysis.module.css";

const CoinAnalysis = ({ coin }) => {
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [aibot, setAibot] = useState(false);

  const alldata = {
    bitcoin: {
      recommendation: "Hold",
      entry_exit_prices: {
        entry_price:
          "Entering at the current price around $107,000 is feasible, considering the ongoing bullish trend.",
        exit_price:
          "An exit around $150,000 is projected by the end of 2025, aligning with market forecasts.",
      },
      projected_growth: {
        short_term:
          "Potential growth to $120,000 by mid-2025, driven by increased institutional investment and favorable regulatory developments.",
        long_term:
          "Anticipated growth to $150,000 by the end of 2025, supported by broader adoption and strategic reserves initiatives.",
      },
      risk_analysis: {
        volatility:
          "High volatility persists, with significant price swings expected due to market speculation and macroeconomic factors.",
        whale_activity:
          "Increased institutional investments, notably by companies like MicroStrategy, indicate strong whale activity.",
        regulatory_risks:
          "Potential regulatory changes under the new administration could impact the market, though current signals are positive.",
        market_disruptions:
          "Global economic shifts and technological developments could introduce unforeseen market disruptions.",
      },
      market_sentiment:
        "Overall sentiment is bullish, fueled by President-elect Donald Trump's pro-crypto stance and plans for a U.S. Bitcoin strategic reserve. Institutional investments and ETF approvals further enhance investor confidence.",
      latest_news: [
        {
          headline:
            "Bitcoin rallies past $107,000, hopes grow for strategic reserve",
          date: "December 15, 2024",
          impact:
            "Bitcoin surged past $107,000 following President-elect Donald Trump's reaffirmation to establish a U.S. Bitcoin strategic reserve, boosting optimism among cryptocurrency enthusiasts.",
          source: "Reuters",
          url: "https://www.reuters.com/markets/currencies/bitcoin-powers-above-105000-first-time-2024-12-15/",
        },
        {
          headline:
            "Bitcoin Price Hits Fresh Record. How Fed Could Hamper Crypto.",
          date: "December 16, 2024",
          impact:
            "Bitcoin reached a new record high of $106,496, driven by Trump's plans to deregulate cryptocurrencies. However, concerns about the Federal Reserve's potential hawkish approach could dampen Bitcoin's rise.",
          source: "Barron's",
          url: "https://www.barrons.com/articles/bitcoin-price-crypto-fed-efa77930",
        },
        {
          headline:
            "La entrada en el Nasdaq 100 refuerza a MicroStrategy, la empresa que más bitcoin posee",
          date: "December 17, 2024",
          impact:
            "MicroStrategy's inclusion in the Nasdaq 100, despite Microsoft's refusal to include bitcoins in its treasury, underscores the growing acceptance of Bitcoin in mainstream finance.",
          source: "Cinco Días",
          url: "https://cincodias.elpais.com/criptoactivos/2024-12-17/la-entrada-en-el-nasdaq-100-refuerza-a-microstrategy-la-empresa-que-mas-bitcoin-posee.html",
        },
        {
          headline:
            "Will bitcoin hit $150,000 in 2025? If so it won't just be down to Trump",
          date: "December 17, 2024",
          impact:
            "Analysts predict Bitcoin could surpass $150,000 in 2025, bolstered by increased institutional participation and evolving regulations, not solely due to Trump's pro-crypto stance.",
          source: "Financial News London",
          url: "https://www.fnlondon.com/articles/will-bitcoin-hit-150-000-in-2025-if-so-it-wont-just-be-down-to-trump-6ca0ee27",
        },
        {
          headline: "What could a Trump presidency mean for Bitcoin?",
          date: "December 16, 2024",
          impact:
            "Trump's recent pro-crypto stance during his 2024 campaign has led to increased investor confidence, contributing to Bitcoin reaching a record high of $100,000 in December 2024.",
          source: "The Scottish Sun",
          url: "https://www.thescottishsun.co.uk/money/14023542/what-could-trump-presidency-mean-bitcoin/",
        },
      ],
    },
    ethereum: {
      recommendation: "Hold",
      entry_exit_prices: {
        entry_price:
          "Entering at the current price around $4,000 is feasible, considering the ongoing market dynamics.",
        exit_price:
          "An exit around $6,000 is projected by 2025, aligning with market forecasts.",
      },
      projected_growth: {
        short_term:
          "Potential growth to $4,500 by mid-2025, driven by increased institutional investment and favorable regulatory developments.",
        long_term:
          "Anticipated growth to $6,000 by the end of 2025, supported by broader adoption and technological advancements.",
      },
      risk_analysis: {
        volatility:
          "High volatility persists, with significant price swings expected due to market speculation and macroeconomic factors.",
        whale_activity:
          "Increased institutional investments and the launch of Ethereum ETFs indicate strong whale activity.",
        regulatory_risks:
          "Potential regulatory changes under the new administration could impact the market, though current signals are positive.",
        market_disruptions:
          "Global economic shifts and technological developments could introduce unforeseen market disruptions.",
      },
      market_sentiment:
        "Overall sentiment is cautiously optimistic, with Ethereum's recent performance lagging behind Bitcoin. However, the potential for increased adoption and favorable regulatory developments under the new administration could enhance its appeal.",
      latest_news: [
        {
          headline:
            "Ether may finally rise to record high next year, after lagging behind bitcoin",
          date: "December 14, 2024",
          impact:
            "Analysts suggest that Ethereum could reach a new all-time high above $5,000 next year if current supply and demand dynamics persist, indicating potential growth.",
          source: "MarketWatch",
          url: "https://www.marketwatch.com/story/ether-may-finally-rise-to-record-high-next-year-after-trailing-behind-bitcoin-916c9cba",
        },
        {
          headline:
            "Ethereum price stalls at key price but on-chain metrics point to a surge",
          date: "December 17, 2024",
          impact:
            "Ethereum's price has stalled at the $4,000 resistance level, but on-chain metrics and other factors suggest potential for further gains.",
          source: "Crypto.news",
          url: "https://crypto.news/ethereum-price-stalls-at-key-price-but-on-chain-metrics-point-to-a-surge/",
        },
        {
          headline:
            "Ethereum Price Prediction: ETH Poised To Reach ATH In Q1 2025",
          date: "December 17, 2024",
          impact:
            "Analysts estimate that ETH can surpass its previous all-time high of $4,891 by Q1 2025, indicating strong potential for growth.",
          source: "Techpoint Africa",
          url: "https://techpoint.africa/2024/12/17/ethereum-price-prediction-eth-poised-to-reach-ath-in-q1-2025-what-does-this-mean-for-eth-based-coins-shiba-inu-and-yeti-ouro/",
        },
        {
          headline:
            "Ethereum (ETH) Price Outlook: Ethereum Shows Strength as Year-End Approaches",
          date: "December 17, 2024",
          impact:
            "Ethereum pushes above the $4,000 level with sustained buying pressure, showing an 80.5% year-over-year growth, strengthening market sentiment.",
          source: "MoneyCheck",
          url: "https://moneycheck.com/ethereum-eth-price-outlook-ethereum-shows-strength-as-year-end-approaches/",
        },
        {
          headline:
            "Ether's not dead yet. Here are 3 ways a second Trump term could help it catch up to bitcoin's rally.",
          date: "December 1, 2024",
          impact:
            "A supportive regulatory environment under Trump's potential second term could boost ether's appeal, helping it close the performance gap with bitcoin.",
          source: "MarketWatch",
          url: "https://www.marketwatch.com/story/ethers-not-dead-yet-here-are-3-ways-a-second-trump-term-could-help-it-catch-up-to-bitcoins-rally-98c5e5ba",
        },
      ],
    },
    xrp: {
      recommendation: "Hold",
      entry_exit_prices: {
        entry_price:
          "Entering at the current price around $2.64 is feasible, considering the recent bullish trend and upcoming developments.",
        exit_price:
          "An exit around $5.85 is projected by mid-2025, aligning with market forecasts and technical analysis.",
      },
      projected_growth: {
        short_term:
          "Potential growth to $4.03 by early 2025, driven by the successful launch of the RLUSD stablecoin and favorable regulatory developments.",
        long_term:
          "Anticipated growth to $5.85 by mid-2025, supported by increased adoption and strategic partnerships.",
      },
      risk_analysis: {
        volatility:
          "High volatility persists, with significant price swings expected due to market speculation and macroeconomic factors.",
        whale_activity:
          "Increased whale activity, with substantial holdings and recent transactions, indicates strong market interest.",
        regulatory_risks:
          "Potential regulatory changes under the new administration could impact the market, though current signals are positive.",
        market_disruptions:
          "Global economic shifts and technological developments could introduce unforeseen market disruptions.",
      },
      market_sentiment:
        "Overall sentiment is bullish, fueled by the successful launch of the RLUSD stablecoin and expectations of a more crypto-friendly regulatory environment under the incoming administration.",
      latest_news: [
        {
          headline:
            "XRP Price Soars After Ripple Launches New Stablecoin Token",
          date: "December 17, 2024",
          impact:
            "XRP's price rose by 11.5% to $2.64 following the launch of Ripple's RLUSD stablecoin, enhancing its position in the digital asset market.",
          source: "Barron's",
          url: "https://www.barrons.com/articles/xrp-price-rlusd-ripple-token-f1de958a",
        },
        {
          headline: "XRP Issuer Ripple Just Got This Big Regulatory Boost",
          date: "December 12, 2024",
          impact:
            "The New York Department of Financial Services approved Ripple Labs' stablecoin RLUSD, providing a significant regulatory boost and enhancing XRP's credibility.",
          source: "Barron's",
          url: "https://www.barrons.com/articles/xrp-ripple-crypto-trump-a24dfb63",
        },
        {
          headline: "XRP Price Surge: Targeting $5.85 and $8.76 by 2025",
          date: "December 18, 2024",
          impact:
            "Analysts project XRP to reach $5.85 and $8.76 by 2025, driven by bullish technical signals and increased whale activity.",
          source: "Brave New Coin",
          url: "https://bravenewcoin.com/sponsored/presale/can-xrp-reach-8-76-a-look-at-technical-analysis-and-recent-news",
        },
        {
          headline: "XRP Slips. Why the Crypto Rally Isn't Over.",
          date: "December 16, 2024",
          impact:
            "Despite a slight dip, XRP remains a leading cryptocurrency, with expectations of continued growth due to favorable market conditions.",
          source: "Barron's",
          url: "https://www.barrons.com/articles/xrp-price-crypto-rally-07e10e1f",
        },
        {
          headline:
            "One of the Election's Biggest Winners Is a Cryptocurrency in Hot Water With the SEC",
          date: "December 13, 2024",
          impact:
            "XRP has surged nearly 400% since the U.S. presidential election, with investors anticipating a more crypto-friendly regulatory environment under the new administration.",
          source: "Barron's",
          url: "https://www.barrons.com/articles/xrp-ripple-crypto-sec-7f320e04",
        },
      ],
    },
    tether: {
      recommendation: "Hold",
      entry_exit_prices: {
        entry_price:
          "Entering at the current price around $1.00 is feasible, considering Tether's stability and widespread use.",
        exit_price:
          "An exit is not applicable for Tether, as it is designed to maintain a 1:1 peg with the U.S. dollar.",
      },
      projected_growth: {
        short_term:
          "Stable at $1.00, with minimal fluctuations expected due to its peg to the U.S. dollar.",
        long_term:
          "Continued stability anticipated, with potential for increased adoption as a preferred stablecoin in the market.",
      },
      risk_analysis: {
        volatility:
          "Low volatility, as Tether is designed to maintain a stable value against the U.S. dollar.",
        whale_activity:
          "High usage among institutional investors and traders, indicating significant whale activity.",
        regulatory_risks:
          "Potential regulatory scrutiny, especially with the new administration's focus on cryptocurrency markets.",
        market_disruptions:
          "Possible disruptions from regulatory changes or shifts in market sentiment towards stablecoins.",
      },
      market_sentiment:
        "Overall sentiment is neutral to positive, with Tether maintaining its position as the leading stablecoin in the market.",
      latest_news: [
        {
          headline:
            "Tether's Market Cap Taps $140B as Stablecoin Dominates Crypto Trading",
          date: "December 16, 2024",
          impact:
            "Tether's market capitalization has surged to $140 billion, solidifying its dominance in the stablecoin market and reflecting increased capital inflow into the virtual asset market.",
          source: "Bitcoin News",
          url: "https://news.bitcoin.com/tethers-market-cap-taps-140b-as-stablecoin-dominates-crypto-trading/",
        },
        {
          headline:
            "Tether Invests in European Stablecoin Issuer Amid USDT Compliance Issues",
          date: "December 17, 2024",
          impact:
            "Tether has invested in a European stablecoin issuer to address compliance issues with the MiCA regulations, indicating a strategic move to align with European regulatory standards.",
          source: "CryptoSlate",
          url: "https://cryptoslate.com/tether-invests-in-european-stablecoin-issuer-as-usdt-remains-non-compliant-with-mica/",
        },
        {
          headline:
            "Tether's Market Capitalization Surges by $50 Billion This Year",
          date: "December 17, 2024",
          impact:
            "The market capitalization of Tether has increased by $50 billion this year, reaching $140 billion, indicating a significant rise in capital inflow into the virtual asset market.",
          source: "BloomingBit",
          url: "https://bloomingbit.io/en/feed/news/80154",
        },
        {
          headline:
            "Tether's CEO Joins Trump's Administration Amidst Regulatory Scrutiny",
          date: "December 11, 2024",
          impact:
            "Howard Lutnick, CEO of Cantor Fitzgerald, is set to join Donald Trump's administration after helping grow the controversial cryptocurrency Tether, raising concerns due to Tether's association with global criminal networks.",
          source: "Financial Times",
          url: "https://www.ft.com/content/b3c5b67d-1df8-4417-8dd5-2c86d76d6392",
        },
        {
          headline:
            "Tether's CEO Expresses Optimism for Crypto Industry Under Trump",
          date: "December 8, 2024",
          impact:
            "Tether's CEO, Paolo Ardoino, expressed optimism for the cryptocurrency industry under President Trump's administration, anticipating a more favorable regulatory environment.",
          source: "Financial Times",
          url: "https://www.ft.com/content/d46b23fa-4114-46b4-94a9-26199b5bb95e",
        },
      ],
    },
    solana: {
      recommendation: "Hold",
      entry_exit_prices: {
        entry_price:
          "Entering at the current price around $216.52 is feasible, considering Solana's recent performance and market dynamics.",
        exit_price:
          "An exit around $500 is projected by 2026, aligning with market forecasts and technical analysis.",
      },
      projected_growth: {
        short_term:
          "Potential growth to $235 by early December 2024, driven by increased adoption and favorable market conditions.",
        long_term:
          "Anticipated growth to $500 by 2026, supported by continued ecosystem development and strategic partnerships.",
      },
      risk_analysis: {
        volatility:
          "High volatility persists, with significant price swings expected due to market speculation and macroeconomic factors.",
        whale_activity:
          "Increased whale activity, with substantial holdings and recent transactions, indicates strong market interest.",
        regulatory_risks:
          "Potential regulatory changes under the new administration could impact the market, though current signals are positive.",
        market_disruptions:
          "Global economic shifts and technological developments could introduce unforeseen market disruptions.",
      },
      market_sentiment:
        "Overall sentiment is cautiously optimistic, with Solana's recent performance lagging behind Bitcoin. However, the potential for increased adoption and favorable regulatory developments under the new administration could enhance its appeal.",
      latest_news: [
        {
          headline: "Solana's Market Capitalization Surges to $105 Billion",
          date: "December 16, 2024",
          impact:
            "Solana's market capitalization has surged to $105 billion, reflecting increased investor confidence and adoption.",
          source: "Messari",
          url: "https://messari.io/project/solana",
        },
        {
          headline:
            "Solana's Price Prediction: Potential to Reach $500 by 2026",
          date: "December 17, 2024",
          impact:
            "Analysts project Solana to reach $500 by 2026, driven by continued ecosystem development and strategic partnerships.",
          source: "Finance Magnates",
          url: "https://www.financemagnates.com/cryptocurrency/will-solana-reach-1000-solana-price-predictions-for-2024-2025-and-latest-sol-surge/",
        },
        {
          headline:
            "Solana's Recent Rally Driven by Memecoins and Speculative Trading",
          date: "December 17, 2024",
          impact:
            "Solana's recent rally, driven by memecoins, may be overvalued due to speculative trading and psychological factors.",
          source: "Seeking Alpha",
          url: "https://seekingalpha.com/article/4744668-is-solana-value-driven-by-fundamentals-or-hype-memecoins-and-market-sentiment",
        },
        {
          headline:
            "Solana's Surge Attracts Market Attention Amidst Altcoin Season",
          date: "December 17, 2024",
          impact:
            "Solana's surge during the 'altcoin season' has attracted significant market attention, with increased trading volumes and investor interest.",
          source: "Cinco Días",
          url: "https://cincodias.elpais.com/criptoactivos/2024-12-04/ether-solana-xrp-al-alza-ha-empezado-la-temporada-de-las-altcoins.html",
        },
        {
          headline:
            "Solana's Price Prediction: Potential for Significant Drop Ahead",
          date: "December 17, 2024",
          impact:
            "Some analysts caution that Solana's price may experience a significant drop, advising investors to monitor market trends closely.",
          source: "Bitcoinist",
          url: "https://bitcoinist.com/solana-price-prediction-2024-2026/",
        },
      ],
    },
    dogecoin: {
      recommendation: "Hold",
      entry_exit_prices: {
        entry_price:
          "Entering at the current price around $0.40 is feasible, considering Dogecoin's recent performance and market dynamics.",
        exit_price:
          "An exit around $1.00 is projected by 2026, aligning with market forecasts and technical analysis.",
      },
      projected_growth: {
        short_term:
          "Potential growth to $0.50 by early December 2024, driven by increased adoption and favorable market conditions.",
        long_term:
          "Anticipated growth to $1.00 by 2026, supported by continued ecosystem development and strategic partnerships.",
      },
      risk_analysis: {
        volatility:
          "High volatility persists, with significant price swings expected due to market speculation and macroeconomic factors.",
        whale_activity:
          "Increased whale activity, with substantial holdings and recent transactions, indicates strong market interest.",
        regulatory_risks:
          "Potential regulatory changes under the new administration could impact the market, though current signals are positive.",
        market_disruptions:
          "Global economic shifts and technological developments could introduce unforeseen market disruptions.",
      },
      market_sentiment:
        "Overall sentiment is cautiously optimistic, with Dogecoin's recent performance lagging behind Bitcoin. However, the potential for increased adoption and favorable regulatory developments under the new administration could enhance its appeal.",
      latest_news: [
        {
          headline: "Dogecoin's Market Capitalization Surges to $58.9 Billion",
          date: "December 16, 2024",
          impact:
            "Dogecoin's market capitalization has surged to $58.9 billion, reflecting increased investor confidence and adoption.",
          source: "Coinbase",
          url: "https://www.coinbase.com/price/dogecoin",
        },
        {
          headline:
            "Dogecoin's Price Prediction: Potential to Reach $1.00 by 2026",
          date: "December 17, 2024",
          impact:
            "Analysts project Dogecoin to reach $1.00 by 2026, driven by continued ecosystem development and strategic partnerships.",
          source: "Finance Magnates",
          url: "https://www.financemagnates.com/cryptocurrency/will-dogecoin-reach-1000-doge-price-predictions-for-2024-2025-and-latest-doge-surge/",
        },
        {
          headline:
            "Dogecoin's Recent Rally Driven by Memecoins and Speculative Trading",
          date: "December 17, 2024",
          impact:
            "Dogecoin's recent rally, driven by memecoins, may be overvalued due to speculative trading and psychological factors.",
          source: "Seeking Alpha",
          url: "https://seekingalpha.com/article/4744668-is-dogecoin-value-driven-by-fundamentals-or-hype-memecoins-and-market-sentiment",
        },
        {
          headline:
            "Dogecoin's Surge Attracts Market Attention Amidst Altcoin Season",
          date: "December 17, 2024",
          impact:
            "Dogecoin's surge during the 'altcoin season' has attracted significant market attention, with increased trading volumes and investor interest.",
          source: "Cinco Días",
          url: "https://cincodias.elpais.com/criptoactivos/2024-12-04/ether-solana-xrp-al-alza-ha-empezado-la-temporada-de-las-altcoins.html",
        },
        {
          headline:
            "Dogecoin's Price Prediction: Potential for Significant Drop Ahead",
          date: "December 17, 2024",
          impact:
            "Some analysts caution that Dogecoin's price may experience a significant drop, advising investors to monitor market trends closely.",
          source: "Bitcoinist",
          url: "https://bitcoinist.com/dogecoin-price-prediction-2024-2026/",
        },
      ],
    },
  };

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
      const apiKey = "your-api-key"; // Replace  API key

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
    if (alldata[coin.name.toLowerCase()]) {
      setResponseData(alldata[coin.id.toLowerCase()]);
    }
  };

  return (
    <>
      {!aibot ? (
        <>
          <button className={s.askaibtn} onClick={() => setAibot(!aibot)}>
            <img src="/askai.png" />
          </button>
          <div className={s.askaitext}>
            <pre>Ask AI →</pre>
          </div>
        </>
      ) : null}
      {aibot ? (
        <div className={`${s.analysisdiv} container`}>
          <h2>
            AskAI{" "}
            <span>
              <button className={s.closebtn} onClick={() => setAibot(!aibot)}>
                X
              </button>
            </span>
          </h2>
          <div className={s.askquediv}>
            <div>
              <img
                src="/askai.png"
                style={{ width: "30px", border: "none", boxShadow: "unset" }}
              />
            </div>
            <div style={{ lineHeight: "30px" }}>
              <p>Hi!</p>
              <p>
                I'm an AI assistant trained on documentation, help articles, and
                other content.
              </p>
              <div
                style={{
                  display: "flex",
                  alignContent: "center",
                  gap: "8px",
                  flexWrap: "wrap",
                }}
              >
                <p>Ask me about</p>
                <button onClick={dummy}>
                  Technical Analysis of <strong>{coin.name}</strong>
                </button>
              </div>
            </div>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {responseData && (
            <>
              <hr />
              <div className={s.askquediv}>
                <div>
                  <p>icon</p>
                </div>
                <div>
                  <p>
                    give me technical analysis of the {coin.name} including
                    future trends and some trending news related to this crypto
                    currency.
                  </p>
                </div>
              </div>
              <hr />
              <div className={s.askquediv}>
                <div>
                  <img
                    src="/askai.png"
                    style={{
                      width: "30px",
                      border: "none",
                      boxShadow: "unset",
                    }}
                  />
                </div>
                <div className={`${s.marketanalysis} `}>
                  {/* Investment Recommendation */}
                  <div className={s.section}>
                    <h2>
                      Investment Recommendation -{" "}
                      <strong
                        style={{ textDecoration: "underline 0.5px gray" }}
                      >
                        {responseData.recommendation}
                      </strong>
                    </h2>
                    <p>
                      Our analysis suggests a approach based on current
                      governance trends and market performance.
                    </p>
                  </div>
                  <hr />
                  {/* Strategic Entry and Exit Points */}
                  <div className={s.section}>
                    <h2>Strategic Entry and Exit Points</h2>
                    <div className={s.entryprices}>
                      <p>
                        <strong>Entry Price:</strong>{" "}
                        {responseData.entry_exit_prices.entry_price}
                        <br />
                        <em>
                          (Optimal entry predicted within short-term trend
                          reversals.)
                        </em>
                      </p>
                      <p>
                        <strong>Exit Price:</strong>{" "}
                        {responseData.entry_exit_prices.exit_price}
                        <br />
                        <em>
                          (Ideal exit for maximizing returns on current cycles.)
                        </em>
                      </p>
                    </div>
                  </div>
                  <hr />
                  {/* Short and Long-Term Growth Potential */}
                  <div className={s.section}>
                    <h2>Short and Long-Term Growth Potential</h2>
                    <p>
                      <strong>Short-Term:</strong>{" "}
                      {responseData.projected_growth.short_term}
                      <br />
                      <em>
                        Key drivers: DeFi adoption spikes and governance
                        rewards.
                      </em>
                    </p>
                    <p>
                      <strong>Long-Term:</strong>{" "}
                      {responseData.projected_growth.long_term}
                      <br />
                      <em>
                        Predicted from DAI ecosystem growth and institutional
                        interest.
                      </em>
                    </p>
                  </div>
                  <hr />
                  {/* Comprehensive Risk Profile */}
                  <div className={s.section}>
                    <h2>Comprehensive Risk Profile</h2>
                    <ul>
                      <li>
                        <strong>Market Volatility:</strong>{" "}
                        {responseData.risk_analysis.volatility}
                        <br />
                        <em>
                          Driven by Ethereum network congestion and price
                          corrections.
                        </em>
                      </li>
                      <li>
                        <strong>Whale Activity:</strong>{" "}
                        {responseData.risk_analysis.whale_activity}
                        <br />
                        <em>
                          Highlighted by recent whale purchases influencing
                          price.
                        </em>
                      </li>
                      <li>
                        <strong>Regulatory Risks:</strong>{" "}
                        {responseData.risk_analysis.regulatory_risks}
                        <br />
                        <em>
                          Potential concerns include stablecoin policies and
                          DeFi regulations.
                        </em>
                      </li>
                      <li>
                        <strong>Market Disruptions:</strong>{" "}
                        {responseData.risk_analysis.market_disruptions}
                        <br />
                        <em>
                          Includes network updates and macroeconomic
                          fluctuations.
                        </em>
                      </li>
                    </ul>
                  </div>
                  <hr />
                  {/* Overall Sentiment and Market Trends */}
                  <div className={s.section}>
                    <h2>Overall Market Sentiment and Trends</h2>
                    <p>
                      {responseData.market_sentiment
                        .split("&#8203;")
                        .join("")
                        .replace(
                          /:contentReference\[oaicite:\d+\]\{index=\d+\}/g,
                          ""
                        )
                        .trim()}
                    </p>
                    <p>
                      <em>
                        Factors: Rising DAI adoption and steady DeFi sector
                        performance.
                      </em>
                    </p>
                  </div>
                  <hr />
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
              </div>
            </>
          )}
        </div>
      ) : null}
    </>
  );
};

export default CoinAnalysis;
