import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { validateBoard, isCompleteAndValid } from "../sudoku/validate.js";
import { generatePuzzleUnique } from "../sudoku/generator.js";
import { findHintCell } from "../sudoku/hint.js";

const GameContext = createContext(null);

const STORAGE_KEY = "ally_sudoku_state_v1";

const initialState = {
  mode: null,                // "EASY" | "NORMAL"
  size: null,                // 6 | 9
  boxRows: null,             // 2 or 3
  boxCols: null,             // 3
  board: [],                 // Cell[][]
  originalBoard: [],         // Cell[][]
  selected: null,            // {r,c} | null
  hint: null,                // {r,c} | null
  startedAt: null,           // ms epoch
  elapsedMs: 0,
  status: "idle",            // "idle" | "playing" | "won" | "completed"
  gameId: null,
  createdBy: null,
};

function deepClone(x) {
  return JSON.parse(JSON.stringify(x));
}

function reducer(state, action) {
  switch (action.type) {
    case "NEW_GAME": {
      const mode = action.mode;
      const payload = generatePuzzleUnique(mode); // bonus: unique solution
      const validated = validateBoard(payload.board, payload.size, payload.boxRows, payload.boxCols);

      return {
        ...state,
        mode,
        size: payload.size,
        boxRows: payload.boxRows,
        boxCols: payload.boxCols,
        board: validated,
        originalBoard: deepClone(validated),
        selected: null,
        hint: null,
        startedAt: Date.now(),
        elapsedMs: 0,
        status: "playing",
      };
    }

    case "RESET": {
      if (state.status === "idle") return state;
      const board = deepClone(state.originalBoard);
      return {
        ...state,
        board,
        selected: null,
        hint: null,
        startedAt: Date.now(),
        elapsedMs: 0,
        status: "playing",
      };
    }

    case "LOAD_GAME": {
      return {
        ...state,
        mode: action.mode,
        size: action.size,
        boxRows: action.boxRows,
        boxCols: action.boxCols,
        board: action.board,
        originalBoard: action.originalBoard,
        gameId: action.gameId,
        createdBy: action.createdBy,
        selected: null,
        hint: null,
        startedAt: Date.now(),
        elapsedMs: 0,
        status: action.status || "playing",
      };
    }

    case "SELECT_CELL": {
      return { ...state, selected: action.pos, hint: null };
    }

    case "TICK": {
      if (state.status !== "playing" || !state.startedAt) return state;
      return { ...state, elapsedMs: Date.now() - state.startedAt };
    }

    case "SET_CELL_VALUE": {
      if (state.status !== "playing") return state;
      const { r, c, value } = action;
      const cell = state.board?.[r]?.[c];
      if (!cell || cell.fixed) return state;

      const next = deepClone(state.board);

      // ignore invalid range here too (safety)
      if (value !== null) {
        if (!Number.isInteger(value) || value < 1 || value > state.size) return state;
      }

      next[r][c].value = value;

      const validated = validateBoard(next, state.size, state.boxRows, state.boxCols);
      const won = isCompleteAndValid(validated);

      return {
        ...state,
        board: validated,
        hint: null,
        status: won ? "won" : "playing",
      };
    }

    case "HINT": {
      if (state.status !== "playing") return state;
      const pos = findHintCell(state.board, state.size, state.boxRows, state.boxCols);
      return { ...state, hint: pos }; // can be null if none
    }

    case "LOAD_SAVED": {
      return action.state;
    }

    case "CLEAR_STORAGE_ONLY": {
      // internal helper
      return state;
    }

    default:
      return state;
  }
}

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // timer
  useEffect(() => {
    const id = setInterval(() => dispatch({ type: "TICK" }), 250);
    return () => clearInterval(id);
  }, []);

  // BONUS: localStorage (must ONLY be accessed here)
  useEffect(() => {
    // load once on mount
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.board && parsed.size && parsed.status === "playing") {
        dispatch({ type: "LOAD_SAVED", state: parsed });
      }
    } catch {
      // ignore corrupted storage
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // save after each action while playing
    if (state.status === "playing" && state.size) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
    // clear after reset is clicked? (they said clear when game over either reset or winner)
    // We'll clear on winner, and also clear when user resets (but reset starts a new playing state),
    // so we clear right before reset via action is not possible here.
    if (state.status === "won" || state.status === "completed") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, [state]);

  // when user hits Reset, reducer restarts the game; requirement says clear localStorage after reset or winner
  // easiest: clear storage whenever board exactly equals originalBoard and elapsedMs==0 right after reset.
  useEffect(() => {
    if (state.status === "playing" && state.elapsedMs === 0 && state.startedAt && state.mode) {
      // heuristic: a fresh start; ok to clear old progress
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, [state.status, state.elapsedMs, state.startedAt, state.mode]);

  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameProvider");
  return ctx;
}