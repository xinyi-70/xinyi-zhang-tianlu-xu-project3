import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../state/AuthContext.jsx";
import { useGame } from "../state/GameContext.jsx";
import { generatePuzzleUnique } from "../sudoku/generator.js";
import { validateBoard } from "../sudoku/validate.js";

export default function Games() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { dispatch } = useGame();
  const navigate = useNavigate();

  // Retrieve game list
  useEffect(() => {
    fetch("/api/sudoku")
      .then(res => res.json())
      .then(data => setGames(data))
      .catch(() => {});
  }, []);

  const createGame = async (difficulty) => {
    if (!user) {
      navigate("/login");
      return;
    }
    setLoading(true);
    try {
      // Frontend generates the Sudoku puzzle
      const payload = generatePuzzleUnique(difficulty);
      const board = validateBoard(payload.board, payload.size, payload.boxRows, payload.boxCols);

      const res = await fetch("/api/sudoku", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          difficulty,
          board,
          originalBoard: board,
          size: payload.size,
          boxRows: payload.boxRows,
          boxCols: payload.boxCols,
        }),
      });
      const data = await res.json();
      if (!res.ok) return;

      // Store the game in the context
      dispatch({
        type: "LOAD_GAME",
        mode: difficulty,
        board,
        originalBoard: board,
        size: payload.size,
        boxRows: payload.boxRows,
        boxCols: payload.boxCols,
        gameId: data.gameId,
      });

      navigate(`/game/${data.gameId}`);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <>
      <main className="main-content">
        <section className="page-section">
          <h1 className="page-title">Game Selection</h1>
          <p className="page-subtitle">Create a new game or pick an existing one.</p>

          <div className="button-group">
            <button
              className="cta-button"
              onClick={() => createGame("EASY")}
              disabled={loading}
            >
              Create Easy Game
            </button>
            <button
              className="cta-button"
              onClick={() => createGame("NORMAL")}
              disabled={loading}
            >
              Create Normal Game
            </button>
          </div>

          <div className="selection-grid">
            {games.map((g) => (
              <div
                key={g._id}
                className="game-card"
                onClick={() => navigate(`/game/${g._id}`)}
                style={{ cursor: "pointer" }}
              >
                <h3>{g.name}</h3>
                <p className="game-author">Difficulty: {g.difficulty}</p>
                <p className="game-author">Created by: {g.createdBy}</p>
                <p className="game-author">{formatDate(g.createdAt)}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2026 Sudoku Game. All rights reserved.</p>
      </footer>
    </>
  );
}