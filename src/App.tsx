import { Outlet, Link } from "react-router";

export default function App() {
  return (
    <>
      <header>
        <nav>
          <Link to="/">Home</Link> | <Link to="/about">About</Link>
        </nav>
      </header>

      <main>
        <Outlet /> {/* 👈 子页面会渲染在这里 */}
      </main>

      <footer>
        <small>© 2025 My App</small>
      </footer>
    </>
  );
}
