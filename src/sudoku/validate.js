function inRange(v, size) {
  return Number.isInteger(v) && v >= 1 && v <= size;
}

export function validateBoard(board, size, boxRows, boxCols) {
  // clone + reset incorrect
  const next = board.map(row => row.map(cell => ({ ...cell, incorrect: false })));

  const markDupes = (positions) => {
    const map = new Map(); // value -> positions
    for (const { r, c } of positions) {
      const v = next[r][c].value;
      if (!inRange(v, size)) continue;
      if (!map.has(v)) map.set(v, []);
      map.get(v).push({ r, c });
    }
    for (const posList of map.values()) {
      if (posList.length > 1) {
        for (const { r, c } of posList) next[r][c].incorrect = true;
      }
    }
  };

  // rows
  for (let r = 0; r < size; r++) {
    markDupes(Array.from({ length: size }, (_, c) => ({ r, c })));
  }
  // cols
  for (let c = 0; c < size; c++) {
    markDupes(Array.from({ length: size }, (_, r) => ({ r, c })));
  }
  // boxes
  for (let br = 0; br < size; br += boxRows) {
    for (let bc = 0; bc < size; bc += boxCols) {
      const positions = [];
      for (let r = br; r < br + boxRows; r++) {
        for (let c = bc; c < bc + boxCols; c++) {
          positions.push({ r, c });
        }
      }
      markDupes(positions);
    }
  }

  return next;
}

export function isCompleteAndValid(board) {
  for (const row of board) {
    for (const cell of row) {
      if (cell.value == null) return false;
      if (cell.incorrect) return false;
    }
  }
  return true;
}