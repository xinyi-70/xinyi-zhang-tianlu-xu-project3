export default function Login() {
  return (
    <>
      <main className="main-content">
        <section className="page-section">
          <h1 className="page-title">Login</h1>
          <p className="page-subtitle">This page is mostly mocked for now.</p>

          <div className="feature-card form-card">
            <form>
              <div className="form-grid">
                <label>
                  Username
                  <input type="text" />
                </label>

                <label>
                  Password
                  <input type="password" />
                </label>

                <button type="button" className="cta-button">
                  Submit
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