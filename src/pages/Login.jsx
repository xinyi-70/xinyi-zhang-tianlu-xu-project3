import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../state/AuthContext.jsx";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    try {
      const res = await fetch("/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }
      login(data.username);
      navigate("/games");
    } catch {
      setError("Server error");
    }
  };

  return (
    <>
      <main className="main-content">
        <section className="page-section">
          <h1 className="page-title">Login</h1>

          <div className="feature-card form-card">
            <form>
              <div className="form-grid">
                <label>
                  Username
                  <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                  />
                </label>

                <label>
                  Password
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </label>

                {error && <p style={{ color: "red" }}>{error}</p>}

                <button
                  type="button"
                  className="cta-button"
                  onClick={handleLogin}
                  disabled={!username || !password}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2026 Sudoku Game. All rights reserved.</p>
      </footer>
    </>
  );
}