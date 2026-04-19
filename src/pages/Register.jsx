import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../state/AuthContext.jsx";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verify, setVerify] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async () => {
    setError("");
    if (password !== verify) {
      setError("Passwords do not match");
      return;
    }
    try {
      const res = await fetch("/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Register failed");
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
          <h1 className="page-title">Register</h1>

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

                <label>
                  Verify Password
                  <input
                    type="password"
                    value={verify}
                    onChange={e => setVerify(e.target.value)}
                  />
                </label>

                {error && <p style={{ color: "red" }}>{error}</p>}

                <button
                  type="button"
                  className="cta-button"
                  onClick={handleRegister}
                  disabled={!username || !password || !verify}
                >
                  Register
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
