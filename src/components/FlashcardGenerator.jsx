import React, { useState, useEffect } from 'react';

export default function FlashcardGenerator() {
  const [flashcards, setFlashcards] = useState([]);
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);

  // 1. Fetch saved flashcards on mount
  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/flashcards');
      const data = await response.json();
      setFlashcards(data);
    } catch (error) {
      console.error('Failed to fetch flashcards:', error);
    }
  };

  // 2. Save generated cards to MongoDB Atlas
  const saveCardsToDatabase = async (cardsToSave) => {
    try {
      const response = await fetch('http://localhost:5000/api/flashcards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cardsToSave),
      });
      
      if (response.ok) {
        // Refresh list after saving
        fetchFlashcards();
      }
    } catch (error) {
      console.error('Error saving flashcards:', error);
    }
  };

  // 3. Handle Gemini Generation & Save
  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);

    try {
      // Your Gemini API call logic here...
      // e.g., const generatedCards = await generateFlashcardsWithGemini(topic);
      
      // Save to database once generated
      // await saveCardsToDatabase(generatedCards);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Your Flashcard UI components */}
    </div>
  );
}