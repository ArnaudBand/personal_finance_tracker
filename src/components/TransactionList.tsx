import React from "react";
import { Transaction } from "../schema/type";

interface Props {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

const TransactionList: React.FC<Props> = ({ transactions, onDelete }) => {
  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      {/* Header with Total Transactions */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-700">Transaction List</h2>
        <span className="text-sm text-gray-500">
          Total: {transactions.length} {transactions.length === 1 ? "transaction" : "transactions"}
        </span>
      </div>

      {/* Transaction List */}
      {transactions.length === 0 ? (
        <p className="text-gray-500 text-center">No transactions yet.</p>
      ) : (
        <ul className="space-y-3 h-full lg:overflow-y-auto lg:max-h-[15vh] lg:scrollbar-thin lg:scrollbar-thumb-gray-300 lg:scrollbar-track-gray-100">
          {transactions.map((transaction) => (
            <li
              key={transaction.id}
              className="flex justify-between items-center p-4 bg-gray-50 border border-gray-200 rounded-lg hover:shadow-md transition"
            >
              {/* Transaction Details */}
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-800">
                  {transaction.category}
                </span>
                <span className="text-xs text-gray-500">${transaction.amount}</span>
              </div>

              {/* Transaction Type */}
              <span
                className={`text-sm font-medium ${
                  transaction.type === "income" ? "text-green-600" : "text-red-600"
                }`}
              >
                {transaction.type}
              </span>

              {/* Delete Button */}
              <button
                onClick={() => onDelete(transaction.id)}
                className="text-sm text-red-500 hover:text-red-600 font-medium"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionList;
