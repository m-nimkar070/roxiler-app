import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStatsData } from "../features/transactions/transactionsSlice";
import LoadingSkelton from "./helpers/LoadingSkelton";

const StatsTable = ({ month }) => {
  const dispatch = useDispatch();
  // Getting state from store.
  const { statsData, status, error } = useSelector(
    (state) => state.transactions
  );

  // Dispatching States Data
  useEffect(() => {
    dispatch(fetchStatsData(month));
  }, [month, dispatch]);

  if (status === "loading") return <LoadingSkelton />;
  if (status === "failed") return <div>Error: {error}</div>;
  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <h1 className="text-xl font-semibold mb-4">Stats Data Table</h1>
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-red-100 p-3 rounded-lg">
          <p className="font-semibold">Total Transaction Amount:</p>
          <p className="text-lg">{statsData.totalSaleAmount}</p>
        </div>
        <div className="bg-green-100 p-3 rounded-lg">
          <p className="font-semibold">Total Items Sold:</p>
          <p className="text-lg">{statsData.totalSoldItems}</p>
        </div>
        <div className="bg-yellow-100 p-3 rounded-lg">
          <p className="font-semibold">Total Items Remaining:</p>
          <p className="text-lg">{statsData.totalNotSoldItems}</p>
        </div>
      </div>
    </div>
  );
};

export default StatsTable;
