import { useState } from "react";

export default function TransactionForm({ books, onTransaction }) {
  const [bookId, setBookId] = useState("");
  const [type, setType] = useState("borrow");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(event) {
    event.preventDefault();

    if (!bookId || quantity < 1) {
      alert("Choose a book and enter a valid quantity.");
      return;
    }

    onTransaction({
      bookId: Number(bookId),
      type,
      quantity: Number(quantity)
    });

    setBookId("");
    setQuantity(1);
  }

  return (
    <form className="card form-grid" onSubmit={handleSubmit}>
      <h2>Book Transaction</h2>

      <label>
        Book
        <select value={bookId} onChange={(e) => setBookId(e.target.value)} required>
          <option value="">Select a book</option>
          {books.map((book) => (
            <option key={book.id} value={book.id}>
              {book.title} ({book.quantity} available)
            </option>
          ))}
        </select>
      </label>

      <label>
        Transaction
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="borrow">Borrow / Deduct Stock</option>
          <option value="return">Return / Add Stock</option>
        </select>
      </label>

      <label>
        Quantity
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
      </label>

      <button type="submit">Submit Transaction</button>
    </form>
  );
}