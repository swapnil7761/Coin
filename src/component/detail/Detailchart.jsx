import React, { useEffect, useState } from "react";
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
        const formattedData = {
          labels: data.prices.map((price) => {
            const date = new Date(price[0]);

            return datarange === timeRanges[0].value // For 1 day range, show time only
              ? date.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : date.toLocaleDateString(); // For other ranges, show date
          }),
          datasets: [
            {
              label: `${coin.id} Price (USD)`,
              data: data.prices.map((price) => price[1]),
              borderColor: "#4caf50",
              backgroundColor: "rgba(76, 175, 80, 0.2)",
              fill: true,
              borderWidth: 0.7,
              pointRadius: 1, // Make points smaller
              pointHoverRadius: 3,
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
  }, [datarange]);

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
          maxTicksLimit: 10, // Limit the number of ticks shown on the X-axis
          maxRotation: 0, // Prevent label rotation
          autoSkip: true, // Automatically skip labels to prevent overlap
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
        <div
          style={{
            width: "100%",
            minWidth: "705px",
            overflow: "auto",
          }}
        >
          <Line data={chartData} options={options} />
        </div>
      ) : (
        <p>No data available.</p>
      )}
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
    </div>
  );
};

export default Detailchart;
