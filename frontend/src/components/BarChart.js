import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBarChartData } from "../features/transactions/transactionsSlice";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import LoadingSkelton from "./helpers/LoadingSkelton";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ month }) => {
  const dispatch = useDispatch();

  // Getting state from store
  const { barChartData, status, error } = useSelector(
    (state) => state.transactions
  );

  // Dispatch to barchart Data.
  useEffect(() => {
    dispatch(fetchBarChartData(month));
  }, [month, dispatch]);

  if (status === "loading") return <LoadingSkelton />;
  if (status === "failed") return <div>Error: {error}</div>;

  const data = {
    labels: barChartData.map((item) => item.range),
    datasets: [
      {
        label: "Number of Items",
        data: barChartData.map((item) => item.count),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Transactions Bar Chart</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
