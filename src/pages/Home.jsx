import heroImg from "../assets/images/sudoku-grid.png";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <main className="main-content">
        <section className="hero">
          <h1>Welcome to Sudoku</h1>
          <p>A clean, calming Sudoku experience with a nature-inspired palette.</p>

          <img
            src={heroImg}
            alt="Sudoku puzzle with floral decorations"
            className="hero-image"
          />

          <Link to="/games" className="cta-button">
            Start Playing
          </Link>
        </section>

        <section className="features">
          <h2>Features</h2>

          <div className="features-grid">
            <div className="feature-card">
              <h3>Easy & Hard Modes</h3>
              <p>Choose between easy 6×6 grids or challenging 9×9 puzzles.</p>
            </div>

            <div className="feature-card">
              <h3>Timer</h3>
              <p>Track your completion time and compete with others.</p>
            </div>

            <div className="feature-card">
              <h3>Leaderboard</h3>
              <p>See how you rank against other players.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2026 Sudoku Game. All rights reserved.</p>
      </footer>
    </>
  );
}