import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Sparkles, BookOpen, Loader2, Copy, Check } from 'lucide-react';

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY || '',
});

export default function AIAssistant({ notes = [] }) {
  const [selectedNote, setSelectedNote] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');
  const [summary, setSummary] = useState('');
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSummarize = async () => {
    const textToSummarize = selectedNote || customPrompt;
    if (!textToSummarize.trim()) return;

    setLoading(true);
    setSummary('');
    setFlashcards([]);

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `You are an academic tutor. Summarize the following note concisely into key bullet points:\n\n${textToSummarize}`,
      });
      setSummary(response.text);
    } catch (error) {
      console.error('Gemini Error:', error);
      setSummary('Failed to generate summary. Please verify your VITE_GEMINI_API_KEY in .env file.');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateFlashcards = async () => {
    const textToProcess = selectedNote || customPrompt;
    if (!textToProcess.trim()) return;

    setLoading(true);
    setSummary('');
    setFlashcards([]);

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Create 3 study flashcards from this text. Output ONLY a valid JSON array of objects with "question" and "answer" properties:\n\n${textToProcess}`,
      });

      const cleanedText = response.text.replace(/```json|```/g, '').trim();
      const parsedCards = JSON.parse(cleanedText);
      setFlashcards(parsedCards);
    } catch (error) {
      console.error('Flashcard Error:', error);
      setSummary('Could not parse flashcards. Try again with a clearer note.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="glass-card glow-border-amber p-6 rounded-2xl flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Sparkles className="text-amber-400 h-6 w-6 animate-float" />
            AI Study Assistant
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Summarize lecture notes and auto-generate flashcards powered by Gemini 2.5.
          </p>
        </div>
      </div>

      <div className="glass-card p-6 rounded-2xl space-y-4">
        <label className="block text-sm font-semibold text-slate-300">
          Select existing note or enter content:
        </label>

        {notes.length > 0 && (
          <select
            value={selectedNote}
            onChange={(e) => {
              setSelectedNote(e.target.value);
              setCustomPrompt('');
            }}
            className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-lg p-3 focus:outline-none focus:border-amber-500"
          >
            <option value="">-- Choose a Note from Vault --</option>
            {notes.map((note) => (
              <option key={note.id} value={note.content}>
                {note.title} ({note.subject})
              </option>
            ))}
          </select>
        )}

        <textarea
          rows={5}
          placeholder="Or paste lecture notes, essay drafts, or topic outlines here..."
          value={customPrompt}
          onChange={(e) => {
            setCustomPrompt(e.target.value);
            setSelectedNote('');
          }}
          className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-lg p-3 focus:outline-none focus:border-amber-500 resize-none text-sm"
        />

        <div className="flex gap-4">
          <button
            onClick={handleSummarize}
            disabled={loading || (!selectedNote && !customPrompt)}
            className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 disabled:opacity-50 text-white font-medium py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition"
          >
            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : <BookOpen className="h-5 w-5" />}
            Summarize Note
          </button>

          <button
            onClick={handleGenerateFlashcards}
            disabled={loading || (!selectedNote && !customPrompt)}
            className="flex-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 disabled:opacity-50 text-amber-400 font-medium py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition"
          >
            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
            Generate Flashcards
          </button>
        </div>
      </div>

      {summary && (
        <div className="glass-card p-6 rounded-2xl relative">
          <button
            onClick={() => copyToClipboard(summary)}
            className="absolute top-4 right-4 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition"
          >
            {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
          </button>
          <h3 className="text-lg font-bold text-amber-400 mb-3">AI Summary</h3>
          <div className="prose prose-invert max-w-none text-slate-300 whitespace-pre-wrap text-sm leading-relaxed">
            {summary}
          </div>
        </div>
      )}

      {flashcards.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-amber-400">Generated Flashcards</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {flashcards.map((card, idx) => (
              <div key={idx} className="glass-card p-5 rounded-xl border-t-2 border-amber-500 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Card #{idx + 1}</span>
                  <p className="font-semibold text-white mt-2 mb-3 text-sm">{card.question}</p>
                </div>
                <div className="border-t border-slate-800 pt-3">
                  <p className="text-xs text-slate-400 leading-relaxed">{card.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}