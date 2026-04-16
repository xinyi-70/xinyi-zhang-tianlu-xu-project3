import express from 'express';
import jwt from 'jsonwebtoken';
import Game from '../models/Game.js';
import words from '../data/words.js';

const router = express.Router();
const SECRET = process.env.SESSION_SECRET;

function getUsername(req) {
  const token = req.cookies.token;
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, SECRET);
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
    const games = await Game.find({}, 'name difficulty createdBy createdAt');
    res.json(games);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/sudoku
router.post('/', async (req, res) => {
  const username = getUsername(req);
  if (!username) return res.status(401).json({ error: 'Must be logged in' });

  const { difficulty, board, originalBoard, size, boxRows, boxCols } = req.body;
  if (!difficulty || !['easy', 'normal'].includes(difficulty)) {
    return res.status(400).json({ error: 'difficulty must be easy or normal' });
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

// DELETE /api/sudoku/:id
router.delete('/:id', async (req, res) => {
  try {
    const game = await Game.findByIdAndDelete(req.params.id);
    if (!game) return res.status(404).json({ error: 'Game not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;