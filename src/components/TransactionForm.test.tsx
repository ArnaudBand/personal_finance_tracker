import { render, fireEvent, screen } from "@testing-library/react";
import TransactionForm from "./TransactionForm";
import '@testing-library/jest-dom';

describe("TransactionForm", () => {
  let mockAddTransaction: jest.Mock;

  beforeEach(() => {
    mockAddTransaction = jest.fn();
    render(<TransactionForm onAddTransaction={mockAddTransaction} />);
  });

  it("handles input changes", () => {
    // Input the category and amount
    fireEvent.change(screen.getByLabelText(/category/i), {
      target: { value: "Salary" },
    });
    fireEvent.change(screen.getByLabelText(/amount/i), {
      target: { value: "1000" },
    });

    // Ensure the values are updated correctly
    expect(screen.getByLabelText(/category/i)).toHaveValue("Salary");
    expect(screen.getByLabelText(/amount/i)).toHaveValue(1000);
  });

  it("updates the type correctly", () => {
    // Change the transaction type to 'expense'
    fireEvent.change(screen.getByLabelText(/type/i), {
      target: { value: "expense" },
    });

    // Verify that the selected type has been updated
    expect(screen.getByLabelText(/type/i)).toHaveValue("expense");
  });
});
