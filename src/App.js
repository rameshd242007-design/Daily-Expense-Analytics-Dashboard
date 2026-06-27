import { useState } from "react";
import "./App.css";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Income");
  const [category, setCategory] = useState("");

  const addTransaction = () => {
    if (!amount || !category) {
      alert("Please enter amount and category");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      amount: Number(amount),
      type,
      category,
    };

    setTransactions([...transactions, newTransaction]);
    setAmount("");
    setCategory("");
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((item) => item.id !== id));
  };

  const income = transactions
    .filter((item) => item.type === "Income")
    .reduce((sum, item) => sum + item.amount, 0);

  const expense = transactions
    .filter((item) => item.type === "Expense")
    .reduce((sum, item) => sum + item.amount, 0);

  const balance = income - expense;

  return (
    <div className="container">
      <h1>💰 Daily Expense Analytics Dashboard</h1>

      <div className="form">
        <input
          type="number"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option>Income</option>
          <option>Expense</option>
        </select>

        <input
          type="text"
          placeholder="Enter Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <button onClick={addTransaction}>Add Transaction</button>
      </div>

      <div className="cards">
        <div className="card income">
          <h2>Total Income</h2>
          <h3>₹{income}</h3>
        </div>

        <div className="card expense">
          <h2>Total Expense</h2>
          <h3>₹{expense}</h3>
        </div>

        <div className="card balance">
          <h2>Balance</h2>
          <h3>₹{balance}</h3>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td colSpan="4">No Transactions</td>
            </tr>
          ) : (
            transactions.map((item) => (
              <tr key={item.id}>
                <td>{item.type}</td>
                <td>{item.category}</td>
                <td>₹{item.amount}</td>
                <td>
                  <button onClick={() => deleteTransaction(item.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;