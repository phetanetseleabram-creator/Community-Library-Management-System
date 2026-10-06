import { useEffect, useState } from "react";
import BookForm from "../components/BookForm.jsx";
import BookTable from "../components/BookTable.jsx";
import {
  loadData,
  saveData,
  STORAGE_KEYS,
  seedBooks,
  makeId
} from "../utils/storage.js";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    const savedBooks = loadData(STORAGE_KEYS.books, seedBooks);
    setBooks(savedBooks);
    saveData(STORAGE_KEYS.books, savedBooks);
  }, []);

  function handleSubmit(bookData) {
    let updatedBooks;

    if (editingBook) {
      updatedBooks = books.map((book) =>
        book.id === editingBook.id ? { ...bookData, id: editingBook.id } : book
      );
    } else {
      updatedBooks = [...books, { ...bookData, id: makeId(books) }];
    }

    setBooks(updatedBooks);
    saveData(STORAGE_KEYS.books, updatedBooks);
    setEditingBook(null);
  }

  function handleDelete(id) {
    if (!window.confirm("Delete this book?")) return;

    const updatedBooks = books.filter((book) => book.id !== id);
    setBooks(updatedBooks);
    saveData(STORAGE_KEYS.books, updatedBooks);
  }

  return (
    <section>
      <div className="page-heading">
        <div>
          <h2>Book Management</h2>
          <p>Add, update and delete library books.</p>
        </div>
      </div>

      <BookForm
        editingBook={editingBook}
        onSubmit={handleSubmit}
        onCancel={() => setEditingBook(null)}
      />

      <BookTable
        books={books}
        onEdit={setEditingBook}
        onDelete={handleDelete}
      />
    </section>
  );
}