import express from 'express';
import jwt from 'jsonwebtoken';
import Highscore from '../models/Highscore.js';

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

// GET /api/highscore
router.get('/', async (req, res) => {
  try {
    const scores = await Highscore.aggregate([
      { $group: { _id: '$username', wins: { $sum: 1 } } },
      { $match: { wins: { $gt: 0 } } },
      { $sort: { wins: -1, _id: 1 } },
      { $project: { username: '$_id', wins: 1, _id: 0 } }
    ]);
    res.json(scores);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/highscore
router.post('/', async (req, res) => {
  const username = getUsername(req);
  if (!username) return res.status(401).json({ error: 'Must be logged in' });

  const { gameId } = req.body;
  if (!gameId) return res.status(400).json({ error: 'gameId required' });

  try {
    const existing = await Highscore.findOne({ username, gameId });
    if (existing) return res.json({ success: true });
    await Highscore.create({ username, gameId });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/highscore/:gameId
router.get('/:gameId', async (req, res) => {
  try {
    const scores = await Highscore.find({ gameId: req.params.gameId });
    res.json(scores);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;