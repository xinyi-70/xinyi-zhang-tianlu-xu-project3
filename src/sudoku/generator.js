import { makeCell } from "./types.js";
import { solveOne, countSolutions } from "./solver.js";

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function makeEmptyValues(size) {
  return Array.from({ length: size }, () => Array(size).fill(null));
}

function wrapCells(values, fixedMask) {
  return values.map((row, r) =>
    row.map((v, c) => makeCell(v, fixedMask[r][c]))
  );
}

function generateSolved(size, boxRows, boxCols) {
  // start empty and solve randomly (solveOne shuffles candidates)
  const empty = makeEmptyValues(size);
  const solved = solveOne(empty, size, boxRows, boxCols);
  if (!solved) throw new Error("Failed to generate solved grid");
  return solved;
}

function carveUnique(solution, size, boxRows, boxCols, givensTarget) {
  let puzzle = solution.map(row => row.slice());
  let filled = size * size;

  const indices = shuffle([...Array(size * size).keys()]);

  for (const idx of indices) {
    if (filled <= givensTarget) break;

    const r = Math.floor(idx / size);
    const c = idx % size;
    if (puzzle[r][c] == null) continue;

    const backup = puzzle[r][c];
    puzzle[r][c] = null;

    // unique check
    const solCount = countSolutions(puzzle, size, boxRows, boxCols, 2);
    if (solCount !== 1) {
      puzzle[r][c] = backup; // revert
    } else {
      filled -= 1;
    }
  }

  // build fixed mask based on which cells remain
  const fixedMask = puzzle.map(row => row.map(v => v != null));
  return wrapCells(puzzle, fixedMask);
}

export function generatePuzzleUnique(mode) {
  if (mode === "easy") {
    const size = 6;
    const boxRows = 2;
    const boxCols = 3;
    const solution = generateSolved(size, boxRows, boxCols);
    const givens = 18; // half of 36
    const board = carveUnique(solution, size, boxRows, boxCols, givens);
    return { size, boxRows, boxCols, board };
  }

  // normal
  const size = 9;
  const boxRows = 3;
  const boxCols = 3;
  const solution = generateSolved(size, boxRows, boxCols);
  const givens = 28 + Math.floor(Math.random() * 3); // 28-30
  const board = carveUnique(solution, size, boxRows, boxCols, givens);
  return { size, boxRows, boxCols, board };
}