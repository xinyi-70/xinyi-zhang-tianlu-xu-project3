import Cell from "./Cell.jsx";

export default function Board({ board, size }) {
  return (
    <div className={`board board--${size}`}>
      {board.map((row, r) =>
        row.map((cell, c) => (
          <Cell key={`${r}-${c}`} r={r} c={c} cell={cell} />
        ))
      )}
    </div>
  );
}