import Navbar from "./Navbar.jsx";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="container">{children}</main>
    </>
  );
}