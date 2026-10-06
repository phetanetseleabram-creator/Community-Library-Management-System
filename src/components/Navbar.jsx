import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="nav-inner">
        <h1>Community Library</h1>

        <nav>
          <NavLink to="/" end>Dashboard</NavLink>
          <NavLink to="/books">Books</NavLink>
          <NavLink to="/transactions">Transactions</NavLink>
          <NavLink to="/users">Users</NavLink>
        </nav>
      </div>
    </header>
  );
}