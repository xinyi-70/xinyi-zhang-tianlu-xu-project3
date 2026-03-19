export function makeCell(value = null, fixed = false) {
  return { value, fixed, incorrect: false };
}

export function deepClone(x) {
  return JSON.parse(JSON.stringify(x));
}

export function makeEmptyBoard(size) {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => makeCell(null, false))
  );
}

export function unwrapValues(board) {
  return board.map(row => row.map(cell => cell.value));
}