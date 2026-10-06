import { useEffect, useState } from "react";
import { loadData, saveData, STORAGE_KEYS, seedBooks } from "../utils/storage.js";

export default function Dashboard() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const savedBooks = loadData(STORAGE_KEYS.books, seedBooks);
    setBooks(savedBooks);
    saveData(STORAGE_KEYS.books, savedBooks);
  }, []);

  const totalTitles = books.length;
  const totalCopies = books.reduce((sum, book) => sum + book.quantity, 0);
  const lowStock = books.filter((book) => book.quantity < 2).length;

  return (
    <section>
      <div className="page-heading">
        <div>
          <h2>Dashboard</h2>
          <p>Current library availability.</p>
        </div>
      </div>

      <div className="stats">
        <div className="stat card">
          <span>Book Titles</span>
          <strong>{totalTitles}</strong>
        </div>
        <div className="stat card">
          <span>Total Copies</span>
          <strong>{totalCopies}</strong>
        </div>
        <div className="stat card">
          <span>Low Stock Titles</span>
          <strong>{lowStock}</strong>
        </div>
      </div>

      <div className="card">
        <h2>Current Availability</h2>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Genre</th>
                <th>Available</th>
              </tr>
            </thead>

            <tbody>
              {books.map((book) => (
                <tr key={book.id} className={book.quantity < 2 ? "low-row" : ""}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.genre}</td>
                  <td>{book.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="note">
          Low stock is highlighted when the available quantity is below 2.
        </p>
      </div>
    </section>
  );
}