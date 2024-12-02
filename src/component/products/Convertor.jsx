import React, { useState, useEffect } from "react";
import s from "./Convertor.module.css";

const Convertor = () => {
  const [rates, setRates] = useState([]);
  const [rate1, setRate1] = useState(null);
  const [rate2, setRate2] = useState(null);
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(null);
  const [exchange, setExchange] = useState(false);

  const formatNumber = (number) => {
    return new Intl.NumberFormat().format(number);
  };

  useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/exchange_rates")
      .then((res) => res.json())
      .then((res) => {
        const ratesData = Object.values(res.rates);
        setRates(ratesData);
        const initialCrypto = ratesData.find((rate) => rate.type === "crypto");
        const initialFiat = ratesData.find((rate) => rate.type === "fiat");

        setRate1(initialCrypto || null);
        setRate2(initialFiat || null);

        if (initialCrypto && initialFiat) {
          const conversion = (1 * initialCrypto.value) / initialFiat.value;
          setResult(
            `1 ${initialCrypto.name} = ${conversion.toFixed(6)} ${
              initialFiat.name
            }`
          );
        }
      })
      .catch((err) => console.error("Error fetching rates:", err));
  }, []);

  const handleConvert = (exchangeState = exchange) => {
    if (!rate1 || !rate2 || !amount || isNaN(amount)) {
      setResult("Please select valid rates and enter a positive amount.");
      return;
    }

    const fromRate = exchangeState ? rate2 : rate1;
    const toRate = exchangeState ? rate1 : rate2;

    const conversion = (parseFloat(amount) * toRate.value) / fromRate.value;

    setResult(
      `${amount} ${fromRate.name} = ${formatNumber(conversion.toFixed(6))} ${
        toRate.name
      }`
    );
  };

  const handleSwitch = () => {
    const updatedRate1 = rate2;
    const updatedRate2 = rate1;

    setRate1(updatedRate1);
    setRate2(updatedRate2);

    handleConvert(true);
  };

  const segregatedRates = {
    crypto: rates.filter((rate) => rate.type === "crypto"),
    fiat: rates.filter((rate) => rate.type === "fiat"),
  };

  useEffect(() => {
    if (rate1 && rate2 && amount) {
      handleConvert();
    }
  }, [amount, rate1, rate2]);
  return (
    <>
      <div className={s.convertorsection}>
        <div className={s.inputsection}>
          <div>
            <input
              type="number"
              step="1"
              min="1"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className={s.inputoption}>
            <select
              className={s.dropdown}
              value={rate1 ? JSON.stringify(rate1) : ""}
              onChange={(e) => {
                const newRate1 = JSON.parse(e.target.value);
                setRate1(newRate1);
                handleConvert(); // Recalculate after changing rate1
              }}
            >
              <optgroup label="Crypto">
                {segregatedRates.crypto.map((rate, index) => (
                  <option key={index} value={JSON.stringify(rate)}>
                    {rate.name} ({rate.unit})
                  </option>
                ))}
              </optgroup>
              <optgroup label="Fiat">
                {segregatedRates.fiat.map((rate, index) => (
                  <option key={index} value={JSON.stringify(rate)}>
                    {rate.name} ({rate.unit})
                  </option>
                ))}
              </optgroup>
            </select>
            <button onClick={handleSwitch}>⇄</button>
            <select
              className={s.dropdown}
              value={rate2 ? JSON.stringify(rate2) : ""}
              onChange={(e) => {
                const newRate2 = JSON.parse(e.target.value);
                setRate2(newRate2);
                handleConvert(); // Recalculate after changing rate2
              }}
            >
              <optgroup label="Fiat">
                {segregatedRates.fiat.map((rate, index) => (
                  <option key={index} value={JSON.stringify(rate)}>
                    {rate.name} ({rate.unit})
                  </option>
                ))}
              </optgroup>
              <optgroup label="Crypto">
                {segregatedRates.crypto.map((rate, index) => (
                  <option key={index} value={JSON.stringify(rate)}>
                    {rate.name} ({rate.unit})
                  </option>
                ))}
              </optgroup>
            </select>
          </div>
          <div className={s.convertbuttonsection}>
            <button onClick={() => handleConvert()}>Refresh</button>
            {result && <p>{result}</p>}
          </div>
        </div>
      </div>
      <div>
        {rates.map((rate, index) => (
          <div key={index}></div>
        ))}
      </div>
    </>
  );
};

export default Convertor;
