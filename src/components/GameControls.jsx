import { useGame } from "../state/GameContext.jsx";

export default function GameControls({ mode }) {
  const { dispatch, state } = useGame();
  const disabledHint = state.status !== "playing";

  return (
    <div className="button-group">
      <button className="cta-button" onClick={() => dispatch({ type: "NEW_GAME", mode })}>
        New Game
      </button>

      <button className="cta-button" onClick={() => dispatch({ type: "RESET" })} disabled={state.status === "idle"}>
        Reset
      </button>

      <button className="cta-button" onClick={() => dispatch({ type: "HINT" })} disabled={disabledHint}>
        Hint
      </button>
    </div>
  );
}