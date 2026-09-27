import React, { useState } from 'react';
import { INITIAL_NOTES, INITIAL_VIDEOS } from '../data/mockData';
import { Plus, Video, FileText, ExternalLink } from 'lucide-react';

export default function NotesVault() {
  const [notes, setNotes] = useState(INITIAL_NOTES);
  const [videos] = useState(INITIAL_VIDEOS);
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!title || !content) return;
    const newNote = {
      id: Date.now().toString(),
      title,
      subject: subject || 'General',
      content,
      tags: ['Study'],
      date: new Date().toISOString().split('T')[0]
    };
    setNotes([newNote, ...notes]);
    setTitle('');
    setSubject('');
    setContent('');
  };

  return (
    <div className="space-y-8">
      {/* Note Creation Form */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-sm">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Plus className="w-5 h-5 text-amber-500" /> Create New Note
        </h3>
        <form onSubmit={handleAddNote} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Note Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500"
            />
            <input
              type="text"
              placeholder="Subject (e.g., Operating Systems)"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500"
            />
          </div>
          <textarea
            placeholder="Write your study notes here..."
            rows="3"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-4 text-sm focus:outline-none focus:border-amber-500"
          ></textarea>
          <button
            type="submit"
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold px-6 py-2.5 rounded-xl text-sm transition-all"
          >
            Save Note
          </button>
        </form>
      </div>

      {/* Notes Grid */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-amber-500" /> Saved Study Notes
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {notes.map((note) => (
            <div key={note.id} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-1 rounded-md font-medium">
                  {note.subject}
                </span>
                <span className="text-xs text-slate-500">{note.date}</span>
              </div>
              <h4 className="text-base font-semibold text-white mb-2">{note.title}</h4>
              <p className="text-sm text-slate-400 line-clamp-3">{note.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Video Vault */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Video className="w-5 h-5 text-amber-500" /> Practical Video Resources
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {videos.map((vid) => (
            <div key={vid.id} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex justify-between items-center">
              <div>
                <span className="text-xs text-slate-400">{vid.subject} • {vid.channel}</span>
                <h4 className="text-sm font-semibold text-white mt-1">{vid.title}</h4>
              </div>
              <a
                href={vid.url}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300 rounded-xl transition-all"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
<div className="glass-card animate-fade-in-up hover:border-amber-500/50 transition-all duration-300 p-5 rounded-2xl">
  {/* Note Content */}
</div>