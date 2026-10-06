import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Books from "./pages/Books.jsx";
import Transactions from "./pages/Transactions.jsx";
import Users from "./pages/Users.jsx";

export default function App() {
  return (
    <BrowserRouter basename="/Community-Library-System">
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/books" element={<Books />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}