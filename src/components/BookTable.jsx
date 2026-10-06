export default function BookTable({ books, onEdit, onDelete }) {
  return (
    <div className="card">
      <h2>Book List</h2>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>ISBN</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>{book.isbn}</td>
                <td className={book.quantity < 2 ? "low-stock" : ""}>
                  {book.quantity}
                </td>
                <td>
                  <button onClick={() => onEdit(book)}>Edit</button>
                  <button
                    className="danger"
                    onClick={() => onDelete(book.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {!books.length && (
              <tr>
                <td colSpan="6">No books have been added yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}