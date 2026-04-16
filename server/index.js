import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import userRoutes from './routes/user.js';
import sudokuRoutes from './routes/sudoku.js';
import highscoreRoutes from './routes/highscore.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// Routes
app.use('/api/user', userRoutes);
app.use('/api/sudoku', sudokuRoutes);
app.use('/api/highscore', highscoreRoutes);

// Serve frontend in production
app.use(express.static(path.join(__dirname, '../dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});