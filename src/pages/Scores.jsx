import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Scores() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    fetch("/api/highscore")
      .then(res => res.json())
      .then(data => setScores(data))
      .catch(() => {});
  }, []);

  return (
    <>
      <main className="main-content">
        <section className="page-section">
          <h1 className="page-title">High Scores</h1>
          <p className="page-subtitle">Players ranked by number of wins.</p>

          <div className="score-table-card">
            <table className="score-table" aria-label="High scores table">
              <thead>
                <tr>
                  <th scope="col">Player</th>
                  <th scope="col">Wins</th>
                </tr>
              </thead>
              <tbody>
                {scores.length === 0 ? (
                  <tr>
                    <td colSpan="2">No scores yet.</td>
                  </tr>
                ) : (
                  scores.map((s) => (
                    <tr key={s.username}>
                      <td>{s.username}</td>
                      <td>{s.wins}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="button-group">
            <Link className="cta-button" to="/games">Play Now</Link>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2026 Sudoku Game. All rights reserved.</p>
      </footer>
    </>
  );
}