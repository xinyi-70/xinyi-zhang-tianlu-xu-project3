function inRange(v, size) {
  return Number.isInteger(v) && v >= 1 && v <= size;
}

export function getCandidates(values, r, c, size, boxRows, boxCols) {
  if (values[r][c] != null) return [];

  const used = new Set();

  // row
  for (let j = 0; j < size; j++) {
    const v = values[r][j];
    if (inRange(v, size)) used.add(v);
  }
  // col
  for (let i = 0; i < size; i++) {
    const v = values[i][c];
    if (inRange(v, size)) used.add(v);
  }
  // box
  const br = Math.floor(r / boxRows) * boxRows;
  const bc = Math.floor(c / boxCols) * boxCols;
  for (let i = br; i < br + boxRows; i++) {
    for (let j = bc; j < bc + boxCols; j++) {
      const v = values[i][j];
      if (inRange(v, size)) used.add(v);
    }
  }

  const candidates = [];
  for (let n = 1; n <= size; n++) {
    if (!used.has(n)) candidates.push(n);
  }
  return candidates;
}

function findBestEmpty(values, size, boxRows, boxCols) {
  let best = null; // {r,c,cands}
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (values[r][c] == null) {
        const cands = getCandidates(values, r, c, size, boxRows, boxCols);
        if (cands.length === 0) return { dead: true };
        if (!best || cands.length < best.cands.length) {
          best = { r, c, cands };
          if (cands.length === 1) return best;
        }
      }
    }
  }
  return best; // null means solved
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function solveOne(values, size, boxRows, boxCols) {
  // returns solved values or null
  const grid = values.map(row => row.slice());

  function backtrack() {
    const pick = findBestEmpty(grid, size, boxRows, boxCols);
    if (pick == null) return true;       // solved
    if (pick.dead) return false;         // dead end

    const { r, c, cands } = pick;
    for (const v of shuffle(cands)) {
      grid[r][c] = v;
      if (backtrack()) return true;
      grid[r][c] = null;
    }
    return false;
  }

  return backtrack() ? grid : null;
}

export function countSolutions(values, size, boxRows, boxCols, limit = 2) {
  const grid = values.map(row => row.slice());
  let count = 0;

  function backtrack() {
    if (count >= limit) return;
    const pick = findBestEmpty(grid, size, boxRows, boxCols);
    if (pick == null) {
      count += 1;
      return;
    }
    if (pick.dead) return;

    const { r, c, cands } = pick;
    for (const v of cands) {
      grid[r][c] = v;
      backtrack();
      grid[r][c] = null;
      if (count >= limit) return;
    }
  }

  backtrack();
  return count;
}