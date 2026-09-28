import mongoose from 'mongoose';

const flashcardSchema = new mongoose.Schema(
  {
    front: { type: String, required: true },
    back: { type: String, required: true },
    subject: { type: String, default: 'General' },
  },
  { timestamps: true }
);

export default mongoose.model('Flashcard', flashcardSchema);