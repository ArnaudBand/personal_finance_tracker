import React from "react";
import { Transaction } from "../schema/type";

interface Props {
  transactions: Transaction[];
}

const Summary: React.FC<Props> = ({ transactions }) => {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);
  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);
  const balance = income - expense;

  return (
    <div className="p-6 bg-white shadow-md rounded-lg grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Income Summary */}
      <div className="p-4 border-l-4 border-green-500 bg-green-50 rounded-md">
        <h2 className="text-lg font-semibold text-green-700">Total Income</h2>
        <p className="text-xl font-bold text-green-700">${income.toFixed(2)}</p>
      </div>

      {/* Expense Summary */}
      <div className="p-4 border-l-4 border-red-500 bg-red-50 rounded-md">
        <h2 className="text-lg font-semibold text-red-700">Total Expense</h2>
        <p className="text-xl font-bold text-red-700">${expense.toFixed(2)}</p>
      </div>

      {/* Balance Summary */}
      <div className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded-md">
        <h2 className="text-lg font-semibold text-blue-700">Balance</h2>
        <p
          className={`text-xl font-bold ${
            balance >= 0 ? "text-blue-700" : "text-red-700"
          }`}
        >
          ${balance.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default Summary;
