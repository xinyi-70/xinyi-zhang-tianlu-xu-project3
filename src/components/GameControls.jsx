import { useNavigate } from "react-router-dom";
import { useGame } from "../state/GameContext.jsx";
import { useAuth } from "../state/AuthContext.jsx";

export default function GameControls() {
  const { dispatch, state } = useGame();
  const { user } = useAuth();
  const navigate = useNavigate();
  const disabledHint = state.status !== "playing" || !user;

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this game?")) return;
    try {
      await fetch(`/api/sudoku/${state.gameId}`, { method: 'DELETE' });
      navigate('/games');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="button-group">
      <button
        className="cta-button"
        onClick={() => dispatch({ type: "RESET" })}
        disabled={state.status === "idle" || !user}
      >
        Reset
      </button>

      <button
        className="cta-button"
        onClick={() => dispatch({ type: "HINT" })}
        disabled={disabledHint}
      >
        Hint
      </button>

      {/* BONUS: Delete Game (only show if user is creator) */}
      {user && state.createdBy === user && (
        <button
          className="cta-button delete-btn"
          onClick={handleDelete}
        >
          DELETE
        </button>
      )}
    </div>
  );
}