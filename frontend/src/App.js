import React, { useState } from "react";
import TransactionsTable from "./components/TransactionsTable";
import BarChart from "./components/BarChart";
import "./App.css";
import StatsTable from "./components/StatsTable";

function App() {
  //Stae to store month default is 3
  const [month, setMonth] = useState(3);

  // Function to handle month change.
  const handleMonthChange = (e) => {
    setMonth(parseInt(e.target.value));
  };
  return (
    <div className="App bg-slate-300 min-h-screen p-6 space-y-6">
      {/* Dashboard Title */}
      <h1 className="text-3xl font-bold text-gray-800 text-center relative pb-2 before:absolute before:w-16 before:h-1 before:bg-blue-500 before:bottom-0 before:left-1/2 before:-translate-x-1/2">
        Dashboard
      </h1>

      {/* Month Selection Dropdown */}
      <div className="flex items-center justify-center space-x-4">
        <label className="text-lg font-medium text-gray-700">
          Select Month:
        </label>
        <select
          value={month}
          onChange={handleMonthChange}
          className="w-48 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(0, i).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>
      </div>

      {/* Transactions Table */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <TransactionsTable month={month} />
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Bar Chart Component */}
        <div className="flex-1 bg-white shadow-md rounded-lg p-4">
          <BarChart month={month} />
        </div>

        {/* Stats Table Component */}
        <div className="flex-1 bg-white shadow-md rounded-lg p-4">
          <StatsTable month={month} />
        </div>
      </div>
    </div>
  );
}

export default App;
