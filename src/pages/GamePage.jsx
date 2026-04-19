import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGame } from "../state/GameContext.jsx";
import { useAuth } from "../state/AuthContext.jsx";
import { validateBoard } from "../sudoku/validate.js";
import Timer from "../components/Timer.jsx";
import GameControls from "../components/GameControls.jsx";
import Board from "../components/Board.jsx";

export default function GamePage() {
  const { gameId } = useParams();
  const { state, dispatch } = useGame();
  const { user } = useAuth();

  // Load game from API
  useEffect(() => {
    if (!gameId) return;
    fetch(`/api/sudoku/${gameId}`)
      .then(res => res.json())
      .then(data => {
        if (!data || data.error) return;
        const board = validateBoard(data.board, data.size, data.boxRows, data.boxCols);
        const originalBoard = validateBoard(data.originalBoard, data.size, data.boxRows, data.boxCols);
        const isCompleted = data.completedBy && user && data.completedBy.includes(user);
        dispatch({
          type: "LOAD_GAME",
          mode: data.difficulty,
          board: isCompleted && data.solution
            ? validateBoard(data.solution, data.size, data.boxRows, data.boxCols)
            : board,
          originalBoard,
          size: data.size,
          boxRows: data.boxRows,
          boxCols: data.boxCols,
          gameId: data._id,
          createdBy: data.createdBy,
          status: isCompleted ? "completed" : "playing",
        });
      })
      .catch(err => console.error(err));
  }, [gameId, user]);

  // POST highscore when game is won
  useEffect(() => {
    if (state.status === "won" && user && state.gameId) {
      fetch("/api/highscore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gameId: state.gameId, solution: state.board }),
      }).catch(err => console.error(err));
    }
  }, [state.status]);

  if (state.status === "idle" || String(state.gameId) !== String(gameId)) {
    return <main className="main-content"><p>Loading...</p></main>;
  }

  const title = state.mode === "EASY" ? "Easy Sudoku (6×6)" : "Normal Sudoku (9×9)";
  const subtitle = state.mode === "EASY"
    ? "Half the board is pre-filled. Use numbers 1–6."
    : "28–30 clues. Use numbers 1–9.";

  return (
    <>
      <main className="main-content">
        <section className="page-section">
          <h1 className="page-title">{title}</h1>
          <p className="page-subtitle">{subtitle}</p>

          <div className="feature-card game-card-wrap">
            {user && <Timer />}

            {(state.status === "won" || state.status === "completed") && (
              <p className="congrats">🎉 Congratulations! Puzzle solved.</p>
            )}

            <Board board={state.board} size={state.size} readonly={!user} />
            <GameControls />

            <p style={{ marginTop: 4 }}>
              Tip: Click a cell and use your keyboard to enter a number. Invalid entries are ignored. Conflicts are highlighted in red.
            </p>
            <p style={{ marginTop: 4 }}>
              Stuck? Press Hint to highlight a cell that has only one valid number.
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