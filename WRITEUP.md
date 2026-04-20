## Deliverables

GitHub repo: [https://github.com/xinyi-70/xinyi-zhang-tianlu-xu-project3](https://github.com/xinyi-70/xinyi-zhang-tianlu-xu-project3)  
Render app: [https://sudoku-project3.onrender.com](https://sudoku-project3.onrender.com)  
Video walkthrough: [https://www.youtube.com/watch?v=QZtPCYL8YRo](https://www.youtube.com/watch?v=QZtPCYL8YRo)  
Collaborators: Xinyi Zhang, Tianlu Xu  

## Challenges Faced

A major challenge was handling the game completion state across the full stack. When a user returned to a completed game, the board incorrectly reverted to an unsolved state due to a conflict between localStorage and the API. localStorage restored a previous `playing` state before the API response completed, overwriting the correct `won` status. This was resolved by introducing a separate `completed` state and persisting completion data (`completedBy` and `solution`) in the Game model.
Another challenge was preventing duplicate highscore entries. This was caused by two issues: a type mismatch between frontend string `gameId` and MongoDB ObjectId, and incorrect triggering of the `useEffect` hook when loading a completed game. We fixed this by converting `gameId` to ObjectId in queries and ensuring highscore submission only occurs on a true transition into the `won` state.

## Additional Features or Design Changes

Given more time, we would implement the Custom Games bonus feature, which would allow users to fill in their own Sudoku board and have the backend verify whether it has a unique solution using our existing `solver.js` logic.
We would also add a second leaderboard sorted by completion time for each specific game, showing the top players ranked from fastest to slowest. This would feel more competitive and intuitive than the current wins-based leaderboard.
Finally, we would improve the game selection page by sorting games by the number of completions rather than creation time, so that popular games appear first. We would also display a completion count on each game card so users can see at a glance how many players have finished it.

## Assumptions Made

We assumed that unauthenticated users should be able to view all pages and games but not interact with them. In practice, this meant disabling cell input, hiding the Timer, and disabling the Reset and Hint buttons for logged-out users.
We assumed that the same user completing the same game multiple times should only count as one win, so we check for an existing Highscore record before creating a new one.
We assumed that since every puzzle has a unique solution, the solution board submitted by any user who completes a game is identical. Therefore, storing the most recent completion's board as the solution is sufficient for displaying it to returning users.
We assumed the game list should be sorted by creation time since the requirement did not specify a sort order.

## Time to Complete

This project took approximately 30–35 hours to complete across the team. Time was primarily spent on setting up the Express backend and MongoDB connection, designing the Mongoose data models, implementing JWT-based authentication, debugging game completion state persistence, resolving Highscore duplicate records, and integrating the frontend with the backend APIs.

## Bonus Points Accomplished

### 1. Submit Early (3 pts)
Submitted the project at least 48 hours before the deadline.

### 2. Password Encryption (2 pts)
User passwords are securely hashed using bcrypt before being stored in MongoDB, ensuring that plaintext passwords are never persisted. This is implemented in the register route in `server/routes/user.js`.

### 3. Delete Game (5 pts)
Users who created a game can delete it from the game page via a DELETE button that is only visible to the creator. Deleting a game also removes all associated highscore records, ensuring data consistency. The backend logic is in the DELETE /api/sudoku/:id route in `server/routes/sudoku.js`, and the frontend button is in `src/components/GameControls.jsx`.
