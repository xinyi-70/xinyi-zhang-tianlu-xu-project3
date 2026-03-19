import { useEffect } from "react";
import { useGame } from "../state/GameContext.jsx";
import Timer from "../components/Timer.jsx";
import GameControls from "../components/GameControls.jsx";
import Board from "../components/Board.jsx";

export default function GamePage({ mode }) {
  const { state, dispatch } = useGame();

  useEffect(() => {
    dispatch({ type: "NEW_GAME", mode });
  }, [mode]);

  const title = mode === "easy" ? "Easy Sudoku (6×6)" : "Normal Sudoku (9×9)";
  const subtitle = mode === "easy"
    ? "Half the board is pre-filled. Use numbers 1–6."
    : "28–30 clues. Use numbers 1–9.";

  if (state.status === "idle" || state.mode !== mode) {
    return <main className="main-content"><p>Loading...</p></main>;
  }

  return (
    <>
      <main className="main-content">
        <section className="page-section">
          <h1 className="page-title">{title}</h1>
          <p className="page-subtitle">{subtitle}</p>

          <div className="feature-card game-card-wrap">
            <Timer />

            {state.status === "won" && (
              <p className="congrats">🎉 Congratulations! Puzzle solved.</p>
            )}

            <Board board={state.board} size={state.size} />
            <GameControls mode={mode} />

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
