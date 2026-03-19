export default function Rules() {
  return (
    <>
      <main className="main-content">
        <section className="hero">
          <h1>Rules</h1>
          <p>Sudoku is a logic puzzle. Fill every row, column, and subgrid with unique numbers.</p>
        </section>

        <section className="features">
          <h2>How to Play</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Rows & Columns</h3>
              <p>Each row and column must contain every number exactly once.</p>
            </div>
            <div className="feature-card">
              <h3>Subgrids</h3>
              <p>Each subgrid must also contain every number exactly once.</p>
              <p>Easy is 6×6 with 2×3 boxes; Normal is 9×9 with 3×3 boxes.</p>
            </div>
            <div className="feature-card">
              <h3>Incorrect Moves</h3>
              <p>If you enter a value that violates a rule, that cell will highlight in red.</p>
            </div>
          </div>
        </section>

        <section className="features">
          <div className="rules-card credits-card">
            <h2>Credits</h2>
            <p>
              Made by <span className="author-name">Chiao-Yu Li, Xinyi Zhang, Tianlu Xu</span>
            </p>

            <p className="contact-links">
              Email:
              <a href="mailto:sudoku@gamemail.com" className="contact-link">sudoku@gamemail.com</a>
              <br />
              GitHub:
              <a href="https://github.com/lichiaoyu/sudoku-project" className="contact-link">github.com/lichiaoyu/sudoku-project</a>
              <br />
              LinkedIn:
              <a href="https://www.linkedin.com/in/sudokugame/" className="contact-link">linkedin.com/in/sudokugame</a>
            </p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2026 Sudoku Game. All rights reserved.</p>
      </footer>
    </>
  );
}
