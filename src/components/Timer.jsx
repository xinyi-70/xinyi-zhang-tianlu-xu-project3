import { useGame } from "../state/GameContext.jsx";

function formatTime(ms) {
  const total = Math.floor(ms / 1000);
  const m = String(Math.floor(total / 60)).padStart(2, "0");
  const s = String(total % 60).padStart(2, "0");
  return `${m}:${s}`;
}

export default function Timer() {
  const { state } = useGame();
  return <div className="timer">Time: {formatTime(state.elapsedMs)}</div>;
}