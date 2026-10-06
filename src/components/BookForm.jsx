import { useEffect, useState } from "react";

const emptyBook = {
  title: "",
  author: "",
  genre: "",
  isbn: "",
  quantity: 0
};

export default function BookForm({ editingBook, onSubmit, onCancel }) {
  const [form, setForm] = useState(emptyBook);

  useEffect(() => {
    if (editingBook) {
      setForm(editingBook);
    } else {
      setForm(emptyBook);
    }
  }, [editingBook]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: name === "quantity" ? Number(value) : value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.title || !form.author || !form.genre || !form.isbn) {
      alert("Please fill in all book fields.");
      return;
    }

    if (form.quantity < 0) {
      alert("Quantity cannot be negative.");
      return;
    }

    onSubmit(form);
    setForm(emptyBook);
  }

  return (
    <form className="card form-grid" onSubmit={handleSubmit}>
      <h2>{editingBook ? "Update Book" : "Add Book"}</h2>

      <label>
        Title
        <input name="title" value={form.title} onChange={handleChange} required />
      </label>

      <label>
        Author
        <input name="author" value={form.author} onChange={handleChange} required />
      </label>

      <label>
        Genre
        <input name="genre" value={form.genre} onChange={handleChange} required />
      </label>

      <label>
        ISBN
        <input name="isbn" value={form.isbn} onChange={handleChange} required />
      </label>

      <label>
        Initial Quantity
        <input
          type="number"
          min="0"
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          required
        />
      </label>

      <div className="button-row">
        <button type="submit">{editingBook ? "Update Book" : "Add Book"}</button>
        {editingBook && (
          <button type="button" className="secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}