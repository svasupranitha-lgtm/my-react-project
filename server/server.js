import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import notesRouter from './routes/notes.js';
import flashcardsRouter from './routes/flashcards.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/notes', notesRouter);
app.use('/api/flashcards', flashcardsRouter);

// Health Check Route
app.get('/', (req, res) => {
  res.json({ message: 'ShikshaOS API Server is running' });
});

// Database Connection
const MONGO_URI = process.env.MONGO_URI;

if (MONGO_URI) {
  mongoose
    .connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((err) => console.error('MongoDB Connection Error:', err));
} else {
  console.log('No MONGO_URI specified in server/.env');
}

// Start Express Server
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});