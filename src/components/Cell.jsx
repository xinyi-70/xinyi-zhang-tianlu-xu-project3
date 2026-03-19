import { useGame } from "../state/GameContext.jsx";

export default function Cell({ r, c, cell }) {
  const { state, dispatch } = useGame();
  const { size, selected, hint, status } = state;

  const isSelected = selected && selected.r === r && selected.c === c;
  const isHint = hint && hint.r === r && hint.c === c;

  const disabled = cell.fixed || status !== "playing";

  function handleChange(e) {
    if (disabled) return;

    const raw = e.target.value;

    // allow delete
    if (raw === "") {
      dispatch({ type: "SET_CELL_VALUE", r, c, value: null });
      return;
    }

    // accept only integer
    const n = Number(raw);
    if (!Number.isInteger(n)) return;

    // range check (ignore others)
    if (n < 1 || n > size) return;

    dispatch({ type: "SET_CELL_VALUE", r, c, value: n });
  }

  const classNames = [
    "cell",
    cell.fixed ? "fixed" : "editable",
    isSelected ? "selected" : "unselected",
    cell.incorrect ? "incorrect" : "",
    isHint ? "hint" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <input
      className={classNames}
      value={cell.value ?? ""}
      disabled={disabled}
      onFocus={() => dispatch({ type: "SELECT_CELL", pos: { r, c } })}
      onClick={() => dispatch({ type: "SELECT_CELL", pos: { r, c } })}
      onChange={handleChange}
      inputMode="numeric"
      maxLength={2}
      aria-label={`cell-${r}-${c}`}
    />
  );
}