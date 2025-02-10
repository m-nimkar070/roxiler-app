import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../features/transactions/transactionsSlice";
import LoadingSkelton from "./helpers/LoadingSkelton";

const TransactionsTable = ({ month }) => {
  const dispatch = useDispatch();
  // Getting transactions from state
  const { transactions, status, error } = useSelector(
    (state) => state.transactions
  );

  // Dispatching financial trasactions
  useEffect(() => {
    dispatch(fetchTransactions(month));
  }, [month, dispatch]);

  if (status === "loading") return <LoadingSkelton />;
  if (status === "failed") return <div>Error: {error}</div>;

  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Transactions Table
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 shadow-md rounded-lg overflow-hidden">
          
          <thead className="bg-gray-100 border-b border-gray-300 z-10 relative">
            <tr className="text-left text-gray-700 uppercase text-sm">
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Sold</th>
              <th className="px-4 py-3">Date of Sale</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 relative z-10">
            {transactions.map((transaction) => (
              <tr key={transaction._id} className="hover:bg-gray-200">
                <td className="px-4 py-3 text-gray-900">{transaction.title}</td>

                {/* Description with Tooltip */}
                <td className="px-4 py-3 text-gray-700 relative group overflow-visible">
                  {transaction.description.length > 50
                    ? transaction.description.slice(0, 50) + "..."
                    : transaction.description}

                  {/* Tooltip */}
                  <span className="absolute left-0 w-max max-w-xs bg-gray-900 text-white text-xs rounded-md p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg z-50 whitespace-normal">
                    {transaction.description}
                  </span>
                </td>

                <td className="px-4 py-3 font-medium text-green-600">
                  ${transaction.price.toFixed(2)}
                </td>
                <td className="px-4 py-3 text-gray-700">
                  {transaction.category}
                </td>
                <td
                  className={`px-4 py-3 font-medium ${
                    transaction.sold ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {transaction.sold ? "Yes" : "No"}
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {new Date(transaction.dateOfSale).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsTable;
