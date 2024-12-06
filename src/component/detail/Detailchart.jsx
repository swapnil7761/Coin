import React, { useEffect, useState, useCallback } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Detailchart = ({ coin }) => {
  const [chartData, setChartData] = useState(null);
  const [datarange, setDatarange] = useState(null);
  const [loading, setLoading] = useState(false);

  const currentTime = Math.floor(Date.now() / 1000);
  const timeRanges = [
    { label: "1D", value: currentTime - 24 * 60 * 60 },
    { label: "1W", value: currentTime - 7 * 24 * 60 * 60 },
    { label: "1M", value: currentTime - 30 * 24 * 60 * 60 },
    { label: "1Y", value: currentTime - 365 * 24 * 60 * 60 },
  ];

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-PyRvXUMXcFVqbTgCszAN4FUK",
      },
    };

    const fromTime = datarange || timeRanges[0].value;
    const url = `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart/range?vs_currency=usd&from=${fromTime}&to=${currentTime}`;

    setLoading(true);

    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        const prices = data.prices.map((price) => price[1]);
        const labels = data.prices.map((price) => {
          const date = new Date(price[0]);
          return datarange === timeRanges[0].value
            ? date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : date.toLocaleDateString();
        });

        const formattedData = {
          labels: labels,
          datasets: [
            {
              label: `${coin.id} Price (USD)`,
              data: prices,
              fill: true,
              backgroundColor: (ctx) => createGradient(ctx.chart.ctx, prices),
              borderWidth: 2,
              pointRadius: 3,
              pointHoverRadius: 6,
              segment: {
                borderColor: (ctx) => {
                  const { p0, p1 } = ctx;
                  return p1.parsed.y > p0.parsed.y
                    ? "rgba(0, 253, 0)"
                    : "rgba(255, 59, 59)"; // Green if increasing, red if decreasing
                },
              },
            },
          ],
        };

        setChartData(formattedData);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [datarange, coin.id]);

  const createGradient = useCallback((ctx, prices) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
    gradient.addColorStop(
      0.2,
      prices[0] < prices[prices.length - 1]
        ? "rgba(0, 199, 0, .3)"
        : "rgba(255, 59, 59, .3)"
    );

    gradient.addColorStop(
      0.9,

      "rgba(0, 0, 0, 0)"
    ); // Transparent bottom
    return gradient;
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true },
      title: {
        display: true,
        text: `${coin.id.toUpperCase()} Price Over Time`,
      },
    },
    scales: {
      x: {
        type: "category",
        labels: chartData?.labels || [],
        ticks: {
          maxTicksLimit: 10,
          maxRotation: 0,
          autoSkip: true,
        },
      },
      y: {
        beginAtZero: false,
        position: "left",
      },
    },
  };

  return (
    <div className="detailchartdiv container">
      {loading ? (
        <div className="loader"></div>
      ) : chartData ? (
        <>
          <div style={{ width: "100%", minWidth: "705px", overflow: "auto" }}>
            <Line data={chartData} options={options} />
          </div>
          <div className="chartbtndiv">
            {timeRanges.map((range) => (
              <button
                key={range.label}
                className={
                  datarange === range.value ? "selected" : "chartbtndivbutton"
                }
                onClick={() => setDatarange(range.value)}
              >
                {range.label}
              </button>
            ))}
          </div>
        </>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};

export default Detailchart;
