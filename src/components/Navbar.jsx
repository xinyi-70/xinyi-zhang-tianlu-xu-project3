import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../state/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

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

          {user ? (
            <>
              <li className="nav-item">
                <span className="nav-username">{user}</span>
              </li>
              <li className="nav-item">
                <button className="nav-logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
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
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}