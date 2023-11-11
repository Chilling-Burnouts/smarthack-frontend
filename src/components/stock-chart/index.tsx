import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import React from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type TimeSeriesData = {
  [date: string]: {
    "1. open": string;
    "2. high": string;
    "3. low": string;
    "4. close": string;
    "5. volume": string;
  };
};

type StockChartProps = {
  timeSeries: TimeSeriesData;
};

export const StockChart: React.FC<StockChartProps> = ({ timeSeries }) => {
  const dates = Object.keys(timeSeries);

  const openPrices = dates.map((date) =>
    parseFloat(timeSeries[date]["1. open"])
  );
  const highPrices = dates.map((date) =>
    parseFloat(timeSeries[date]["2. high"])
  );
  const lowPrices = dates.map((date) => parseFloat(timeSeries[date]["3. low"]));
  const closePrices = dates.map((date) =>
    parseFloat(timeSeries[date]["4. close"])
  );
  const volumes = dates.map((date) =>
    parseFloat(timeSeries[date]["5. volume"])
  );
  const chartData = {
    labels: dates,
    datasets: [
      {
        label: "Open Price",
        data: openPrices,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "High Price",
        data: highPrices,
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
      {
        label: "Low Price",
        data: lowPrices,
        borderColor: "rgb(255, 206, 86)",
        backgroundColor: "rgba(255, 206, 86, 0.5)",
      },
      {
        label: "Close Price",
        data: closePrices,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
      {
        label: "Volume",
        data: volumes,
        borderColor: "rgb(153, 102, 255)",
        backgroundColor: "rgba(153, 102, 255, 0.5)",
        yAxisID: "y-axis-volume",
      },
    ],
  };

  return <Line data={chartData} />;
};
