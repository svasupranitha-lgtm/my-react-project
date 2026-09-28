import express from 'express';
import Flashcard from '../models/Flashcard.js';

const router = express.Router();

// GET all flashcards
router.get('/', async (req, res) => {
  try {
    const cards = await Flashcard.find().sort({ createdAt: -1 });
    res.json(cards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new flashcards (supports array/bulk save)
router.post('/', async (req, res) => {
  try {
    const { cards } = req.body;
    const savedCards = await Flashcard.insertMany(cards);
    res.status(201).json(savedCards);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a flashcard by ID
router.delete('/:id', async (req, res) => {
  try {
    await Flashcard.findByIdAndDelete(req.params.id);
    res.json({ message: 'Flashcard deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;