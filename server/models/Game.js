import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  difficulty: { type: String, enum: ['EASY', 'NORMAL'], required: true },
  createdBy: { type: String, required: true },
  board: { type: [[mongoose.Schema.Types.Mixed]], required: true },
  originalBoard: { type: [[mongoose.Schema.Types.Mixed]], required: true },
  size: { type: Number, required: true },
  boxRows: { type: Number, required: true },
  boxCols: { type: Number, required: true },
  completedBy: { type: [String], default: [] },
  solution: { type: [[mongoose.Schema.Types.Mixed]], default: null },
}, { timestamps: true });

export default mongoose.model('Game', gameSchema);