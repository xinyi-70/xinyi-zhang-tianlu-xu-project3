import { Link } from "react-router-dom";

export default function Scores() {
  return (
    <>
      <main className="main-content">
        <section className="page-section">
          <h1 className="page-title">High Scores</h1>
          <p className="page-subtitle">Mock leaderboard (static).</p>

          <div className="score-table-card">
            <table className="score-table" aria-label="High scores table">
              <thead>
                <tr>
                  <th scope="col">Player</th>
                  <th scope="col">Completed</th>
                  <th scope="col">Best Time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>amy_lee</td>
                  <td>42</td>
                  <td>02:58</td>
                </tr>
                <tr>
                  <td>ninjaturtle101</td>
                  <td>31</td>
                  <td>03:14</td>
                </tr>
                <tr>
                  <td>matcha_latte</td>
                  <td>27</td>
                  <td>03:45</td>
                </tr>
                <tr>
                  <td>squarenine</td>
                  <td>19</td>
                  <td>04:02</td>
                </tr>
                <tr>
                  <td>teddybear452</td>
                  <td>12</td>
                  <td>04:51</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="button-group">
            <Link className="cta-button" to="/games/easy">Play Easy</Link>
            <Link className="cta-button" to="/games/normal">Play Normal</Link>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2026 Sudoku Game. All rights reserved.</p>
      </footer>
    </>
  );
}