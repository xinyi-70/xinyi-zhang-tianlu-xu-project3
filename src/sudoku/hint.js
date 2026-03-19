import { getCandidates } from "./solver.js";

export function findHintCell(board, size, boxRows, boxCols) {
  const values = board.map(row => row.map(cell => cell.value));

  const forced = [];
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (values[r][c] == null && !board[r][c].fixed) {
        const cands = getCandidates(values, r, c, size, boxRows, boxCols);
        if (cands.length === 1) forced.push({ r, c });
      }
    }
  }

  if (forced.length === 0) return null;
  const pick = forced[Math.floor(Math.random() * forced.length)];
  return pick;
}