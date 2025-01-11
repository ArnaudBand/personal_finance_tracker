import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import Summary from "./components/Summary";
import useLocalStorage from "./hooks/useLocalStorage";

export default function Home() {
  const [transactions, setTransactions] = useLocalStorage<{
    id: string;
    type: "income" | "expense";
    amount: number;
    category: string;
  }[]>("transactions", []);

  const addTransaction = (transaction: {
    id: string;
    type: "income" | "expense";
    amount: number;
    category: string;
  }) => {
    setTransactions([...transactions, transaction]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 py-8">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-700 sm:text-5xl">
            Personal Finance Tracker
          </h1>
          <p className="mt-2 text-lg text-gray-600 sm:text-xl">
            Take control of your income and expenses with ease.
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column: Form */}
          <section className="w-full lg:col-span-2">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Add Transaction
              </h2>
              <TransactionForm onAddTransaction={addTransaction} />
            </div>
          </section>

          {/* Right Column: Summary and List */}
          <section className="space-y-10 lg:col-span-2">
            {/* Summary */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Summary
              </h2>
              <Summary transactions={transactions} />
            </div>

            {/* Transaction List */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Transaction History
              </h2>
              <TransactionList
                transactions={transactions}
                onDelete={deleteTransaction}
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
