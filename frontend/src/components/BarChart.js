import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ data }) => {
  const chartData = {
    labels: ["0-100", "101-200", "201-300", "301-400", "401-500", "501-600", "601-700", "701-800", "801-900", "901-above"],
    datasets: [
      {
        label: "Number of Items",
        data: [
          data["0-100"] || 0,
          data["101-200"] || 0,
          data["201-300"] || 0,
          data["301-400"] || 0,
          data["401-500"] || 0,
          data["501-600"] || 0,
          data["601-700"] || 0,
          data["701-800"] || 0,
          data["801-900"] || 0,
          data["901-above"] || 0,
        ],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return (
    <div>
      <h2>Price Range Bar Chart</h2>
      <Bar data={chartData} options={{ responsive: true }} />
    </div>
  );
};

export default BarChart;
