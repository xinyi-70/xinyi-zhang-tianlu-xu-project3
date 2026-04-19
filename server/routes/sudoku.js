import express from 'express';
import jwt from 'jsonwebtoken';
import Game from '../models/Game.js';
import words from '../data/words.js';
import Highscore from '../models/Highscore.js';

const router = express.Router();

function getUsername(req) {
  const token = req.cookies.token;
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.username;
  } catch {
    return null;
  }
}

function generateGameName() {
  const pick = () => words[Math.floor(Math.random() * words.length)];
  return `${pick()} ${pick()} ${pick()}`;
}

// GET /api/sudoku
router.get('/', async (req, res) => {
  try {
    const games = await Game.find({}, 'name difficulty createdBy createdAt _id')
    res.json(games);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/sudoku/:id
router.get('/:id', async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ error: 'Game not found' });
    res.json(game);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/sudoku
router.post('/', async (req, res) => {
  const username = getUsername(req);
  if (!username) return res.status(401).json({ error: 'Must be logged in' });

  const { difficulty, board, originalBoard, size, boxRows, boxCols } = req.body;
  if (!difficulty || !['EASY', 'NORMAL'].includes(difficulty)) {
    return res.status(400).json({ error: 'difficulty must be EASY or NORMAL' });
  }

  try {
    let name;
    let attempts = 0;
    do {
      name = generateGameName();
      attempts++;
    } while (await Game.findOne({ name }) && attempts < 10);

    const game = await Game.create({
      name,
      difficulty,
      createdBy: username,
      board,
      originalBoard,
      size,
      boxRows,
      boxCols,
    });

    res.json({ gameId: game._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/sudoku/:id
router.put('/:id', async (req, res) => {
  try {
    const game = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!game) return res.status(404).json({ error: 'Game not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// BONUS: Delete Game (deletes game and all associated highscores)
// DELETE /api/sudoku/:id
router.delete('/:id', async (req, res) => {
  try {
    const username = getUsername(req);
    if (!username) return res.status(401).json({ error: 'Must be logged in' });
    
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ error: 'Game not found' });
    if (game.createdBy !== username) return res.status(403).json({ error: 'Not authorized' });
    
    await Game.findByIdAndDelete(req.params.id);
    await Highscore.deleteMany({ gameId: req.params.id });
    
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;