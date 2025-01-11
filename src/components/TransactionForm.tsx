import React, { useState } from "react";
import { Transaction } from "../schema/type";

interface Props {
  onAddTransaction: (transaction: Transaction) => void;
}

const TransactionForm: React.FC<Props> = ({ onAddTransaction }) => {
  const [type, setType] = useState<"income" | "expense">("income");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTransaction({ id: Date.now().toString(), type, category, amount });
    setCategory("");
    setAmount(0);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 p-6 bg-white shadow-md rounded-lg"
    >
      <h2 className="text-xl font-semibold text-gray-700 text-center">
        Add Transaction
      </h2>

      {/* Type Selector */}
      <div>
        <label htmlFor="type" className="block text-gray-600 font-medium mb-1">
          Type
        </label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value as "income" | "expense")}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      {/* Category Input */}
      <div>
        <label
          htmlFor="category"
          className="block text-gray-600 font-medium mb-1"
        >
          Category
        </label>
        <input
          id="category"
          type="text"
          placeholder="E.g., Salary, Rent, Shopping"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Amount Input */}
      <div>
        <label
          htmlFor="amount"
          className="block text-gray-600 font-medium mb-1"
        >
          Amount
        </label>
        <input
          id="amount"
          type="number"
          placeholder="Enter the amount"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Add Transaction
      </button>
    </form>
  );
};

export default TransactionForm;
