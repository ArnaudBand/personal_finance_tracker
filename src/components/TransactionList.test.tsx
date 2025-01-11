import { render, screen, fireEvent } from "@testing-library/react";
import TransactionList from "./TransactionList";
import { Transaction } from "../schema/type";
import '@testing-library/jest-dom';

describe("TransactionList Component", () => {
  const mockTransactions: Transaction[] = [
    { id: "1", type: "income", amount: 500, category: "Salary" },
    { id: "2", type: "expense", amount: 100, category: "Groceries" },
    { id: "3", type: "income", amount: 200, category: "Freelance" },
  ];

  const mockOnDelete = jest.fn();

  test("renders the correct number of transactions", () => {
    render(<TransactionList transactions={mockTransactions} onDelete={mockOnDelete} />);

    // Check for header and transaction count
    expect(screen.getByText("Transaction List")).toBeInTheDocument();
    expect(screen.getByText("Total: 3 transactions")).toBeInTheDocument();

    // Ensure all transactions are displayed
    const items = screen.getAllByRole("listitem");
    expect(items.length).toBe(3);
  });

  test("renders 'No transactions yet' when the list is empty", () => {
    render(<TransactionList transactions={[]} onDelete={mockOnDelete} />);

    expect(screen.getByText(/No transactions yet/i)).toBeInTheDocument();
  });

  test("calls onDelete when the delete button is clicked", () => {
    render(<TransactionList transactions={mockTransactions} onDelete={mockOnDelete} />);

    const deleteButtons = screen.getAllByText(/Delete/i);
    expect(deleteButtons.length).toBe(3);

    // Simulate clicking the delete button of the first transaction
    fireEvent.click(deleteButtons[0]);
    expect(mockOnDelete).toHaveBeenCalledWith("1");
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });

  test("displays transaction details correctly", () => {
    render(<TransactionList transactions={mockTransactions} onDelete={mockOnDelete} />);

    // Check that each transaction's details are rendered
    expect(screen.getByText(/Salary/i)).toBeInTheDocument();
    expect(screen.getByText(/\$500/i)).toBeInTheDocument();
    expect(screen.getAllByText(/income/i));

    expect(screen.getByText(/Groceries/i)).toBeInTheDocument();
    expect(screen.getByText(/\$100/i)).toBeInTheDocument();
    expect(screen.getAllByText(/expense/i));

    expect(screen.getByText(/Freelance/i)).toBeInTheDocument();
    expect(screen.getByText(/\$200/i)).toBeInTheDocument();
    expect(screen.getAllByText(/income/i));
  });

  test("applies the correct class for transaction type", () => {
    render(<TransactionList transactions={mockTransactions} onDelete={mockOnDelete} />);

    const incomeType = screen.getAllByText(/income/i);
    const expenseType = screen.getAllByText(/expense/i);

    incomeType.forEach((type) => {
      expect(type).toHaveClass("text-green-600");
    });

    expenseType.forEach((type) => {
      expect(type).toHaveClass("text-red-600");
    });
  });
});
