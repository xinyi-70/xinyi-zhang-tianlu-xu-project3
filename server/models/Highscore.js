import mongoose from 'mongoose';

const highscoreSchema = new mongoose.Schema({
  username: { type: String, required: true },
  gameId: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
}, { timestamps: true });

export default mongoose.model('Highscore', highscoreSchema);