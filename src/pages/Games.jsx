import { Link } from "react-router-dom";

const puzzles = [
  { title: "Midnight Grid", author: "Ava Lin", to: "/games/normal" },
  { title: "Neon Numbers", author: "Mason Park", to: "/games/normal" },
  { title: "Quiet Logic", author: "Nora Chen", to: "/games/normal" },
  { title: "Skyline Classic", author: "Riley Stone", to: "/games/easy" },
  { title: "Coffee Break Sudoku", author: "Theo Kim", to: "/games/easy" },
  { title: "Greenline Starter", author: "Jun Park", to: "/games/easy" },
];

export default function Games() {
  const getModeLabel = (path) => (path.includes("/easy") ? "Easy" : "Normal");
  const getSizeLabel = (path) => (path.includes("/easy") ? "6*6" : "9*9");

  return (
    <>
      <main className="main-content">
        <section className="page-section">
          <h1 className="page-title">Game Selection</h1>
          <p className="page-subtitle">
            Pick a puzzle. Any selection opens the game page.
          </p>

          <div className="selection-grid">
            {puzzles.map((p) => (
              <Link key={p.title} to={p.to} className="game-card">
                <h3>{p.title} ({getModeLabel(p.to)} {getSizeLabel(p.to)})</h3>
                <p className="game-author">Author: {p.author}</p>
              </Link>
            ))}
          </div>

          <div className="button-group">
            <Link className="cta-button" to="/games/easy">Try Easy (6×6)</Link>
            <Link className="cta-button" to="/games/normal">Try Normal (9×9)</Link>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2026 Sudoku Game. All rights reserved.</p>
      </footer>
    </>
  );
}
