export default function TransactionTable({ transactions, books }) {
  function getBookTitle(bookId) {
    return books.find((book) => book.id === bookId)?.title || "Unknown book";
  }

  return (
    <div className="card">
      <h2>Transaction History</h2>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Book</th>
              <th>Type</th>
              <th>Quantity</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{getBookTitle(transaction.bookId)}</td>
                <td>{transaction.type}</td>
                <td>{transaction.quantity}</td>
                <td>{transaction.date}</td>
              </tr>
            ))}

            {!transactions.length && (
              <tr>
                <td colSpan="4">No transactions recorded yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}