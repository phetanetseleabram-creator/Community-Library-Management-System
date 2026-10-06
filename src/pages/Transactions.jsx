import { useEffect, useState } from "react";
import TransactionForm from "../components/TransactionForm.jsx";
import TransactionTable from "../components/TransactionTable.jsx";
import {
  loadData,
  saveData,
  STORAGE_KEYS,
  seedBooks,
  makeId
} from "../utils/storage.js";

export default function Transactions() {
  const [books, setBooks] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const savedBooks = loadData(STORAGE_KEYS.books, seedBooks);
    const savedTransactions = loadData(STORAGE_KEYS.transactions, []);

    setBooks(savedBooks);
    setTransactions(savedTransactions);

    saveData(STORAGE_KEYS.books, savedBooks);
    saveData(STORAGE_KEYS.transactions, savedTransactions);
  }, []);

  function handleTransaction({ bookId, type, quantity }) {
    const book = books.find((item) => item.id === bookId);

    if (!book) {
      alert("Book not found.");
      return;
    }

    if (type === "borrow" && book.quantity < quantity) {
      alert("There is not enough stock available for this book.");
      return;
    }

    const updatedBooks = books.map((item) => {
      if (item.id !== bookId) return item;

      const newQuantity =
        type === "borrow"
          ? item.quantity - quantity
          : item.quantity + quantity;

      return { ...item, quantity: newQuantity };
    });

    const newTransaction = {
      id: makeId(transactions),
      bookId,
      type,
      quantity,
      date: new Date().toLocaleString()
    };

    const updatedTransactions = [...transactions, newTransaction];

    setBooks(updatedBooks);
    setTransactions(updatedTransactions);

    saveData(STORAGE_KEYS.books, updatedBooks);
    saveData(STORAGE_KEYS.transactions, updatedTransactions);
  }

  return (
    <section>
      <div className="page-heading">
        <div>
          <h2>Transactions</h2>
          <p>Borrow books, return books and track transaction history.</p>
        </div>
      </div>

      <TransactionForm books={books} onTransaction={handleTransaction} />
      <TransactionTable transactions={transactions} books={books} />
    </section>
  );
}