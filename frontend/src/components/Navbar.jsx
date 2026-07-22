import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Navbar({ onExport }) {
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useTheme();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
      <div className="container">

        <Link className="navbar-brand fw-bold" to="/dashboard">
          💰 Expense Tracker
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">

          <ul className="navbar-nav ms-auto align-items-lg-center">

            <li className="nav-item">
              <Link className="nav-link active" to="/dashboard">
                Dashboard
              </Link>
            </li>

            <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
              <button
                className="btn btn-outline-light btn-sm w-100"
                onClick={toggleTheme}
              >
                {darkMode ? "☀️ Light" : "🌙 Dark"}
              </button>
            </li>

            <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
              <button
                className="btn btn-success btn-sm w-100"
                onClick={onExport}
              >
                Export PDF
              </button>
            </li>

            <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
              <button
                className="btn btn-danger btn-sm w-100"
                onClick={logout}
              >
                Logout
              </button>
            </li>

          </ul>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;