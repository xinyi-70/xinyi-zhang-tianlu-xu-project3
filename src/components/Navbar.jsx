import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <NavLink to="/" className="logo-link">
            Sudoku
          </NavLink>
        </div>

        <ul className="navbar-menu">
          <li className="nav-item">
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              <span>Home</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/games" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              <span>Play</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/rules" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              <span>Rules</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/scores" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              <span>High Scores</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/login" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              <span>Login</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/register" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              <span>Register</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}