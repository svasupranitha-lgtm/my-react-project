// 

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, FileText, Tag } from 'lucide-react';

export default function NotesVault() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', subject: 'General', content: '', tags: '' });

  // 1. Fetch notes from backend on component mount
  const fetchNotes = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/notes');
      if (response.ok) {
        const data = await response.json();
        setNotes(data);
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // 2. Add a new note to backend
  const handleCreateNote = async (e) => {
    e.preventDefault();
    if (!newNote.title || !newNote.content) return;

    try {
      const formattedTags = newNote.tags.split(',').map((tag) => tag.trim()).filter(Boolean);
      const response = await fetch('http://localhost:5000/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newNote.title,
          subject: newNote.subject,
          content: newNote.content,
          tags: formattedTags,
        }),
      });

      if (response.ok) {
        await fetchNotes(); // Refresh list from server
        setNewNote({ title: '', subject: 'General', content: '', tags: '' });
        setShowModal(false);
      }
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  // 3. Delete a note from backend
  const handleDeleteNote = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/notes/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setNotes((prev) => prev.filter((note) => note._id !== id));
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto text-slate-100">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Notes Vault</h1>
          <p className="text-slate-400 text-sm">Store, organize, and manage your study materials</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg transition"
        >
          <Plus className="w-4 h-4" /> Add Note
        </button>
      </div>

      {loading ? (
        <div className="text-slate-400">Loading notes...</div>
      ) : notes.length === 0 ? (
        <div className="p-8 text-center border border-dashed border-slate-800 rounded-xl text-slate-500">
          No notes found. Click "Add Note" to create your first note!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <div key={note._id} className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {note.subject}
                  </span>
                  <button
                    onClick={() => handleDeleteNote(note._id)}
                    className="text-slate-500 hover:text-red-400 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <h3 className="font-semibold text-lg text-white mb-2">{note.title}</h3>
                <p className="text-slate-400 text-sm line-clamp-3 mb-4">{note.content}</p>
              </div>

              {note.tags && note.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800">
                  {note.tags.map((tag, idx) => (
                    <span key={idx} className="text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded flex items-center gap-1">
                      <Tag className="w-3 h-3 text-slate-500" /> {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal for adding notes */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-white">Create New Note</h2>
            <form onSubmit={handleCreateNote} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={newNote.title}
                  onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white text-sm focus:outline-none focus:border-indigo-500"
                  placeholder="e.g. Operating System Threads"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Subject</label>
                <input
                  type="text"
                  value={newNote.subject}
                  onChange={(e) => setNewNote({ ...newNote, subject: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white text-sm focus:outline-none focus:border-indigo-500"
                  placeholder="e.g. Computer Science"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Content</label>
                <textarea
                  required
                  rows={4}
                  value={newNote.content}
                  onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white text-sm focus:outline-none focus:border-indigo-500"
                  placeholder="Type note details here..."
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  value={newNote.tags}
                  onChange={(e) => setNewNote({ ...newNote, tags: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white text-sm focus:outline-none focus:border-indigo-500"
                  placeholder="os, thread, concurrency"
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg text-slate-400 hover:text-white text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-semibold"
                >
                  Save Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}