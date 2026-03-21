# Sudoku Project 2

## How to Run
To use, run `npm install` and then `npm run dev` in the root directory.

```bash
npm install
npm run dev
```
## Deliverables
GitHub repo: https://github.com/lichiaoyu/chiaoyu-li-xinyi-zhang-tianlu-xu-project2  
Render app: https://chiaoyu-li-xinyi-zhang-tianlu-xu-project2.onrender.com/  
Video walkthrough: https://youtu.be/nEYTEj1mKXM 
Collaborators: Chiao-Yu Li, Xinyi Zhang, Tianlu Xu

## Challenges Faced

A main challenge was keeping game state consistent across many interactions (selecting a cell, typing, deleting, validating conflicts, resetting, and detecting a win). I avoided scattered state updates by centralizing all game transitions in a reducer inside `src/state/GameContext.jsx`, so each user action updates state through one predictable path. Another challenge was supporting both 6×6 (easy) and 9×9 (normal) without duplicating code; I parameterized validation and rendering by board size and subgrid dimensions. Finally, I tuned feedback so the UI is helpful but not disruptive: invalid placements are highlighted in red while out-of-range inputs are ignored rather than crashing or corrupting state.

## Additional Features or Design Changes

Given more time, I would add real user accounts and persistent score tracking backed by a database instead of the current static high-scores page. I would also implement “pencil marks” so players can store multiple candidates per cell and later confirm a final value, which is a common Sudoku quality-of-life feature. On the design/accessibility side, I would improve keyboard navigation (arrow keys, tab order, shortcuts) and add more explicit focus styling to support non-mouse play. Lastly, I would add automated tests for the reducer and Sudoku utility functions to prevent regressions as the codebase grows.

## Assumptions Made

I assumed players should be allowed to enter values freely and receive immediate feedback, rather than hard-blocking all conflicting moves, because it keeps play flexible while still enforcing rules visually. I assumed both game modes should share the same core logic pipeline, with mode-specific differences limited to board size and clue density. For puzzle quality, I assumed unique-solution generation was worth the extra computation time so that each generated puzzle is logically consistent. For persistence, I assumed using browser `localStorage` was acceptable for this assignment and restricted storage access to the context layer.

## Time to Complete

This assignment took about **40 hours** total, including planning, implementation, debugging, styling, and final polish.

## Bonus Points Accomplished

I implemented **unique-solution puzzle generation** using backtracking: clues are removed only if the puzzle still has exactly one solution, verified by solution counting (`src/sudoku/generator.js`, `src/sudoku/solver.js`). I also added **localStorage persistence**, saving game state after actions, restoring it on load, and clearing it when the game is reset or completed (`src/state/GameContext.jsx`). Finally, I added a **hint system** that finds a cell with exactly one valid candidate and highlights it for the player (`src/sudoku/hint.js`, `src/components/Cell.jsx`).
