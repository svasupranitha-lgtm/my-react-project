import React, { useState, useEffect } from 'react';

// Fullscreen File Viewer Modal Component
function FullscreenFileViewer({ activeFile, onClose, onDeleteNote, onDeleteYt, theme }) {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  if (!activeFile) return null;

  const handleDelete = () => {
    if (activeFile.type === 'note') onDeleteNote(activeFile.id);
    if (activeFile.type === 'youtube') onDeleteYt(activeFile.id);
    setShowConfirmDelete(false);
    onClose();
  };

  const isDark = theme === 'dark';

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: isDark ? 'rgba(2, 6, 23, 0.95)' : 'rgba(241, 245, 249, 0.95)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 9999,
        padding: '32px',
        boxSizing: 'border-box',
      }}
    >
      {/* Header Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: '20px',
          borderBottom: `1px solid ${isDark ? '#1e293b' : '#cbd5e1'}`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '36px' }}>
            {activeFile.type === 'note' ? '📄' : '📺'}
          </span>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  fontSize: '11px',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  backgroundColor:
                    activeFile.type === 'note'
                      ? 'rgba(249, 115, 22, 0.2)'
                      : 'rgba(239, 68, 68, 0.2)',
                  color: activeFile.type === 'note' ? '#f97316' : '#ef4444',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                }}
              >
                {activeFile.type === 'note' ? 'Text Note' : 'YouTube Link'}
              </span>
              <span style={{ fontSize: '12px', color: isDark ? '#64748b' : '#475569' }}>
                Folder: {activeFile.folder}
              </span>
            </div>
            <h2
              style={{
                fontSize: '24px',
                fontWeight: '700',
                margin: '4px 0 0 0',
                color: isDark ? '#f8fafc' : '#0f172a',
              }}
            >
              {activeFile.title}.{activeFile.type === 'note' ? 'txt' : 'yt'}
            </h2>
          </div>
        </div>

        <button
          onClick={onClose}
          style={{
            padding: '10px 20px',
            backgroundColor: isDark ? '#334155' : '#cbd5e1',
            color: isDark ? '#fff' : '#0f172a',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '14px',
          }}
        >
          ✕ Exit Fullscreen
        </button>
      </div>

      {/* Main Fullscreen Body */}
      <div
        style={{
          flex: 1,
          marginTop: '24px',
          backgroundColor: isDark ? '#0f172a' : '#ffffff',
          border: `1px solid ${isDark ? '#1e293b' : '#cbd5e1'}`,
          borderRadius: '16px',
          padding: '36px',
          overflowY: 'auto',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: activeFile.type === 'youtube' ? 'center' : 'flex-start',
          alignItems: activeFile.type === 'youtube' ? 'center' : 'stretch',
        }}
      >
        <button
          onClick={() => setShowConfirmDelete(true)}
          style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            padding: '10px 16px',
            backgroundColor: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#ef4444',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '13px',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          🗑 Delete File
        </button>

        {showConfirmDelete && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: isDark ? 'rgba(2, 6, 23, 0.85)' : 'rgba(241, 245, 249, 0.85)',
              backdropFilter: 'blur(4px)',
              zIndex: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                backgroundColor: isDark ? '#0f172a' : '#ffffff',
                border: `1px solid ${isDark ? '#334155' : '#cbd5e1'}`,
                borderRadius: '12px',
                padding: '28px',
                maxWidth: '400px',
                textAlign: 'center',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
              }}
            >
              <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', color: isDark ? '#f8fafc' : '#0f172a' }}>
                Delete this file?
              </h3>
              <p style={{ margin: '0 0 20px 0', fontSize: '14px', color: isDark ? '#94a3b8' : '#475569' }}>
                Are you sure you want to permanently delete "{activeFile.title}"?
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button
                  onClick={() => setShowConfirmDelete(false)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: isDark ? '#334155' : '#cbd5e1',
                    color: isDark ? '#fff' : '#0f172a',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: '600',
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#dc2626',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: '600',
                  }}
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {activeFile.type === 'note' && (
          <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}>
            <h3 style={{ fontSize: '20px', color: '#f97316', marginBottom: '16px', fontWeight: '600' }}>
              Note Content
            </h3>
            <div
              style={{
                color: isDark ? '#cbd5e1' : '#334155',
                fontSize: '16px',
                lineHeight: '1.8',
                whiteSpace: 'pre-wrap',
                fontFamily: 'Consolas, Monaco, monospace',
                backgroundColor: isDark ? '#020617' : '#f8fafc',
                padding: '28px',
                borderRadius: '12px',
                border: `1px solid ${isDark ? '#1e293b' : '#cbd5e1'}`,
              }}
            >
              {activeFile.content}
            </div>
          </div>
        )}

        {activeFile.type === 'youtube' && (
          <div
            style={{
              maxWidth: '600px',
              width: '100%',
              backgroundColor: isDark ? '#020617' : '#f8fafc',
              border: `1px solid ${isDark ? '#1e293b' : '#cbd5e1'}`,
              borderRadius: '16px',
              padding: '40px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            <span style={{ fontSize: '64px' }}>📺</span>
            <h3 style={{ margin: 0, fontSize: '22px', color: isDark ? '#f8fafc' : '#0f172a', fontWeight: '700' }}>
              {activeFile.title}
            </h3>
            <p style={{ margin: 0, fontSize: '14px', color: isDark ? '#94a3b8' : '#475569' }}>
              Target URL:
            </p>
            <p style={{ margin: 0, fontSize: '14px', color: '#38bdf8', wordBreak: 'break-all', fontFamily: 'monospace' }}>
              {activeFile.url}
            </p>
            <a
              href={activeFile.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                padding: '16px 28px',
                backgroundColor: '#ef4444',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: '10px',
                fontWeight: '700',
                fontSize: '16px',
                marginTop: '10px',
                boxShadow: '0 4px 20px rgba(239, 68, 68, 0.4)',
              }}
            >
              ▶ Watch Video on YouTube
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

// Reusable Folder Header Bar Component for Tabs
function FolderHeaderBar({ folders, selectedFolder, setSelectedFolder, handleRightClickFolder, newFolderName, setNewFolderName, handleAddFolder, theme }) {
  const isDark = theme === 'dark';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: isDark ? '#0f172a' : '#ffffff', padding: '16px', borderRadius: '12px', border: `1px solid ${isDark ? '#1e293b' : '#cbd5e1'}`, flexWrap: 'wrap' }}>
      <span style={{ fontSize: '13px', color: isDark ? '#94a3b8' : '#475569' }}>Folder (Right-click to delete):</span>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', flex: 1 }}>
        {folders.map((f) => (
          <button
            key={f}
            onClick={() => setSelectedFolder(f)}
            onContextMenu={(e) => handleRightClickFolder(e, f)}
            title="Right-click to delete folder"
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              border: selectedFolder === f ? '1px solid #f97316' : `1px solid ${isDark ? '#334155' : '#cbd5e1'}`,
              backgroundColor: selectedFolder === f ? 'rgba(249, 115, 22, 0.15)' : (isDark ? '#020617' : '#f8fafc'),
              color: selectedFolder === f ? '#f97316' : (isDark ? '#94a3b8' : '#475569'),
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '13px',
            }}
          >
            📁 {f}
          </button>
        ))}
      </div>
      <form onSubmit={handleAddFolder} style={{ display: 'flex', gap: '8px' }}>
        <input
          type="text"
          placeholder="+ New Folder"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
          style={{ padding: '6px 12px', borderRadius: '8px', border: `1px solid ${isDark ? '#334155' : '#cbd5e1'}`, backgroundColor: isDark ? '#020617' : '#f8fafc', color: isDark ? '#fff' : '#0f172a', fontSize: '13px', outline: 'none' }}
        />
        <button type="submit" style={{ padding: '6px 14px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
          Create
        </button>
      </form>
    </div>
  );
}

// AI Assistant Component
function AiAssistantSection({ currentUser, folders, selectedFolder, setSelectedFolder, handleDeleteFolder, theme }) {
  const [chatHistory, setChatHistory] = useState(() => {
    const saved = localStorage.getItem(`shiksha_ai_chats_${currentUser.email}`);
    return saved ? JSON.parse(saved) : [];
  });
  const [inputMessage, setInputMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    localStorage.setItem(`shiksha_ai_chats_${currentUser.email}`, JSON.stringify(chatHistory));
  }, [chatHistory, currentUser.email]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMsg = {
      id: Date.now(),
      folder: selectedFolder,
      sender: 'user',
      text: inputMessage.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatHistory((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const aiMsg = {
        id: Date.now() + 1,
        folder: selectedFolder,
        sender: 'ai',
        text: `Here is a helpful response regarding "${userMsg.text}" in ${selectedFolder}:`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setChatHistory((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1000);
  };

  const clearFolderChats = () => {
    setChatHistory((prev) => prev.filter((msg) => msg.folder !== selectedFolder));
  };

  const filteredChats = chatHistory.filter((msg) => {
    const matchesFolder = msg.folder === selectedFolder;
    const matchesSearch = msg.text.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFolder && matchesSearch;
  });

  const isDark = theme === 'dark';

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '700', margin: 0, color: isDark ? '#f8fafc' : '#0f172a' }}>🤖 AI Study Assistant</h2>
          <p style={{ fontSize: '14px', color: isDark ? '#94a3b8' : '#475569', margin: '4px 0 0 0' }}>
            Current Topic: <strong style={{ color: '#f97316' }}>{selectedFolder}</strong>
          </p>
        </div>
        <button
          onClick={clearFolderChats}
          style={{
            padding: '8px 14px',
            backgroundColor: isDark ? '#1e293b' : '#e2e8f0',
            color: isDark ? '#cbd5e1' : '#334155',
            border: `1px solid ${isDark ? '#334155' : '#cbd5e1'}`,
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: '500',
          }}
        >
          Clear {selectedFolder} Chats
        </button>
      </div>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', backgroundColor: isDark ? '#0f172a' : '#ffffff', padding: '14px', borderRadius: '12px', border: `1px solid ${isDark ? '#1e293b' : '#cbd5e1'}` }}>
        <span style={{ fontSize: '13px', color: isDark ? '#64748b' : '#64748b', alignSelf: 'center', marginRight: '8px', fontWeight: '500' }}>
          Active Subject (Right-click to delete folder):
        </span>
        {folders.map((f) => (
          <button
            key={f}
            onClick={() => setSelectedFolder(f)}
            onContextMenu={(e) => handleDeleteFolder(e, f)}
            title="Right-click to delete folder"
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              border: selectedFolder === f ? '1px solid #f97316' : `1px solid ${isDark ? '#334155' : '#cbd5e1'}`,
              backgroundColor: selectedFolder === f ? 'rgba(249, 115, 22, 0.15)' : (isDark ? '#020617' : '#f8fafc'),
              color: selectedFolder === f ? '#f97316' : (isDark ? '#94a3b8' : '#475569'),
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '13px',
            }}
          >
            📁 {f}
          </button>
        ))}
      </div>

      <div style={{ backgroundColor: isDark ? '#0f172a' : '#ffffff', padding: '12px', borderRadius: '12px', border: `1px solid ${isDark ? '#1e293b' : '#cbd5e1'}` }}>
        <input
          type="text"
          placeholder={`🔍 Search messages in "${selectedFolder}"...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 16px',
            borderRadius: '8px',
            border: `1px solid ${isDark ? '#334155' : '#cbd5e1'}`,
            backgroundColor: isDark ? '#020617' : '#f8fafc',
            color: isDark ? '#fff' : '#0f172a',
            fontSize: '14px',
            boxSizing: 'border-box',
            outline: 'none',
          }}
        />
      </div>

      <div style={{ minHeight: '360px', maxHeight: '500px', overflowY: 'auto', backgroundColor: isDark ? '#0f172a' : '#ffffff', borderRadius: '12px', border: `1px solid ${isDark ? '#1e293b' : '#cbd5e1'}`, padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {filteredChats.length === 0 ? (
          <div style={{ color: isDark ? '#64748b' : '#94a3b8', textAlign: 'center', margin: 'auto', fontSize: '14px' }}>
            {searchQuery ? 'No matching chat messages found.' : `No AI discussions saved for "${selectedFolder}" yet.`}
          </div>
        ) : (
          filteredChats.map((msg) => (
            <div
              key={msg.id}
              style={{
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '75%',
                backgroundColor: msg.sender === 'user' ? '#f97316' : (isDark ? '#1e293b' : '#e2e8f0'),
                color: msg.sender === 'user' ? '#fff' : (isDark ? '#fff' : '#0f172a'),
                padding: '12px 16px',
                borderRadius: msg.sender === 'user' ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', fontSize: '11px', opacity: 0.8, marginBottom: '4px' }}>
                <span style={{ fontWeight: '600' }}>{msg.sender === 'user' ? 'You' : 'AI Assistant'}</span>
                <span>{msg.timestamp}</span>
              </div>
              <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>{msg.text}</p>
            </div>
          ))
        )}
        {isTyping && <div style={{ color: '#f97316', fontSize: '13px', fontStyle: 'italic' }}>AI is thinking...</div>}
      </div>

      <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '12px' }}>
        <input
          type="text"
          placeholder={`Ask AI something about ${selectedFolder}...`}
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          style={{ flex: 1, padding: '14px 16px', borderRadius: '10px', border: `1px solid ${isDark ? '#334155' : '#cbd5e1'}`, backgroundColor: isDark ? '#0f172a' : '#ffffff', color: isDark ? '#fff' : '#0f172a', fontSize: '14px', outline: 'none' }}
        />
        <button type="submit" style={{ padding: '14px 28px', backgroundColor: '#f97316', color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' }}>
          Send
        </button>
      </form>
    </div>
  );
}

// Main App Component
export default function App() {
  const [authMode, setAuthMode] = useState('login');
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('shiksha_registered_users');
    return saved ? JSON.parse(saved) : [];
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('shiksha_is_logged_in') === 'true';
  });

  const [authName, setAuthName] = useState('');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const [currentUser, setCurrentUser] = useState(() => {
    const name = localStorage.getItem('shiksha_user_name') || 'Student User';
    const email = localStorage.getItem('shiksha_user_email') || 'student@shiksha.edu';
    return { name, email };
  });

  const [activeTab, setActiveTab] = useState('dashboard');
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('shiksha_theme') || 'dark';
  });

  // Base shared folders created from File Drive
  const [driveFolders, setDriveFolders] = useState(['General']);
  const [newDriveFolderName, setNewDriveFolderName] = useState('');
  const [selectedDriveFolder, setSelectedDriveFolder] = useState('General');

  // Independent custom folders for Notes Vault
  const [notesFolders, setNotesFolders] = useState(['General']);
  const [newNotesFolderName, setNewNotesFolderName] = useState('');
  const [selectedNotesFolder, setSelectedNotesFolder] = useState('General');

  // Independent custom folders for YouTube Library
  const [ytFolders, setYtFolders] = useState(['General']);
  const [newYtFolderName, setNewYtFolderName] = useState('');
  const [selectedYtFolder, setSelectedYtFolder] = useState('General');

  const [notes, setNotes] = useState([]);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');

  const [ytLinks, setYtLinks] = useState([]);
  const [newYtTitle, setNewYtTitle] = useState('');
  const [newYtUrl, setNewYtUrl] = useState('');

  const [files, setFiles] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [newSubjectName, setNewSubjectName] = useState('');

  const [activeViewerFile, setActiveViewerFile] = useState(null);
  const [folderToDeleteTarget, setFolderToDeleteTarget] = useState(null);

  useEffect(() => {
    localStorage.setItem('shiksha_theme', theme);
  }, [theme]);

  useEffect(() => {
    if (!isAuthenticated || !currentUser.email) return;

    const userEmail = currentUser.email;

    const savedNotes = localStorage.getItem(`shiksha_notes_${userEmail}`);
    setNotes(savedNotes ? JSON.parse(savedNotes) : []);

    const savedYt = localStorage.getItem(`shiksha_yt_links_${userEmail}`);
    setYtLinks(savedYt ? JSON.parse(savedYt) : []);

    const savedDriveFolders = localStorage.getItem(`shiksha_drive_folders_${userEmail}`);
    const initialDriveFolders = savedDriveFolders ? JSON.parse(savedDriveFolders) : ['General'];
    setDriveFolders(initialDriveFolders);
    setSelectedDriveFolder('General');

    const savedNotesFolders = localStorage.getItem(`shiksha_notes_folders_${userEmail}`);
    setNotesFolders(savedNotesFolders ? JSON.parse(savedNotesFolders) : ['General']);
    setSelectedNotesFolder('General');

    const savedYtFolders = localStorage.getItem(`shiksha_yt_folders_${userEmail}`);
    setYtFolders(savedYtFolders ? JSON.parse(savedYtFolders) : ['General']);
    setSelectedYtFolder('General');

    const savedFiles = localStorage.getItem(`shiksha_files_${userEmail}`);
    setFiles(savedFiles ? JSON.parse(savedFiles) : []);

    const savedSubjects = localStorage.getItem(`shiksha_subjects_${userEmail}`);
    setSubjects(savedSubjects ? JSON.parse(savedSubjects) : []);
  }, [isAuthenticated, currentUser.email]);

  useEffect(() => {
    localStorage.setItem('shiksha_registered_users', JSON.stringify(users));
  }, [users]);

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setAuthError('');

    const cleanEmail = authEmail.trim().toLowerCase();
    const cleanPassword = authPassword.trim();
    const cleanName = authName.trim();

    if (authMode === 'signup') {
      const exists = users.find((u) => u.email === cleanEmail);
      if (exists) {
        setAuthError('An account with this email already exists. Please log in.');
        return;
      }

      const newUser = { name: cleanName || 'Student User', email: cleanEmail, password: cleanPassword };
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);

      setIsAuthenticated(true);
      setCurrentUser({ name: newUser.name, email: newUser.email });
      localStorage.setItem('shiksha_is_logged_in', 'true');
      localStorage.setItem('shiksha_user_name', newUser.name);
      localStorage.setItem('shiksha_user_email', newUser.email);
    } else {
      const user = users.find((u) => u.email === cleanEmail && u.password === cleanPassword);
      if (user || (cleanEmail && cleanPassword)) {
        const loggedName = user ? user.name : 'Student User';
        setIsAuthenticated(true);
        setCurrentUser({ name: loggedName, email: cleanEmail });
        localStorage.setItem('shiksha_is_logged_in', 'true');
        localStorage.setItem('shiksha_user_name', loggedName);
        localStorage.setItem('shiksha_user_email', cleanEmail);
      } else {
        setAuthError('Invalid email or password.');
      }
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAuthEmail('');
    setAuthPassword('');
    setAuthName('');
    setAuthError('');
    localStorage.removeItem('shiksha_is_logged_in');
    localStorage.removeItem('shiksha_user_name');
    localStorage.removeItem('shiksha_user_email');
  };

  // Add folder in File Drive (syncs to all sections)
  const handleAddDriveFolder = (e) => {
    e.preventDefault();
    if (!newDriveFolderName.trim()) return;
    const cleanName = newDriveFolderName.trim();
    if (!driveFolders.includes(cleanName)) {
      const updated = [...driveFolders, cleanName];
      setDriveFolders(updated);
      setSelectedDriveFolder(cleanName);
      localStorage.setItem(`shiksha_drive_folders_${currentUser.email}`, JSON.stringify(updated));
    }
    setNewDriveFolderName('');
  };

  // Add folder in Notes Vault (independent)
  const handleAddNotesFolder = (e) => {
    e.preventDefault();
    if (!newNotesFolderName.trim()) return;
    const cleanName = newNotesFolderName.trim();
    if (!notesFolders.includes(cleanName)) {
      const updated = [...notesFolders, cleanName];
      setNotesFolders(updated);
      setSelectedNotesFolder(cleanName);
      localStorage.setItem(`shiksha_notes_folders_${currentUser.email}`, JSON.stringify(updated));
    }
    setNewNotesFolderName('');
  };

  // Add folder in YouTube Library (independent)
  const handleAddYtFolder = (e) => {
    e.preventDefault();
    if (!newYtFolderName.trim()) return;
    const cleanName = newYtFolderName.trim();
    if (!ytFolders.includes(cleanName)) {
      const updated = [...ytFolders, cleanName];
      setYtFolders(updated);
      setSelectedYtFolder(cleanName);
      localStorage.setItem(`shiksha_yt_folders_${currentUser.email}`, JSON.stringify(updated));
    }
    setNewYtFolderName('');
  };

  const handleRightClickDriveFolder = (e, folder) => {
    e.preventDefault();
    if (folder === 'General') {
      alert('The "General" folder cannot be deleted.');
      return;
    }
    setFolderToDeleteTarget({ type: 'drive', folder });
  };

  const handleRightClickNotesFolder = (e, folder) => {
    e.preventDefault();
    if (folder === 'General') {
      alert('The "General" folder cannot be deleted.');
      return;
    }
    setFolderToDeleteTarget({ type: 'notes', folder });
  };

  const handleRightClickYtFolder = (e, folder) => {
    e.preventDefault();
    if (folder === 'General') {
      alert('The "General" folder cannot be deleted.');
      return;
    }
    setFolderToDeleteTarget({ type: 'yt', folder });
  };

  const confirmDeleteFolder = () => {
    if (!folderToDeleteTarget) return;

    const { type, folder } = folderToDeleteTarget;

    if (type === 'drive') {
      const updatedFolders = driveFolders.filter((f) => f !== folder);
      setDriveFolders(updatedFolders);
      localStorage.setItem(`shiksha_drive_folders_${currentUser.email}`, JSON.stringify(updatedFolders));
      if (selectedDriveFolder === folder) setSelectedDriveFolder('General');

      const updatedFiles = files.filter((f) => f.folder !== folder);
      setFiles(updatedFiles);
      localStorage.setItem(`shiksha_files_${currentUser.email}`, JSON.stringify(updatedFiles));
    } else if (type === 'notes') {
      const updatedFolders = notesFolders.filter((f) => f !== folder);
      setNotesFolders(updatedFolders);
      localStorage.setItem(`shiksha_notes_folders_${currentUser.email}`, JSON.stringify(updatedFolders));
      if (selectedNotesFolder === folder) setSelectedNotesFolder('General');

      const updatedNotes = notes.filter((n) => n.folder !== folder);
      setNotes(updatedNotes);
      localStorage.setItem(`shiksha_notes_${currentUser.email}`, JSON.stringify(updatedNotes));
    } else if (type === 'yt') {
      const updatedFolders = ytFolders.filter((f) => f !== folder);
      setYtFolders(updatedFolders);
      localStorage.setItem(`shiksha_yt_folders_${currentUser.email}`, JSON.stringify(updatedFolders));
      if (selectedYtFolder === folder) setSelectedYtFolder('General');

      const updatedYt = ytLinks.filter((y) => y.folder !== folder);
      setYtLinks(updatedYt);
      localStorage.setItem(`shiksha_yt_links_${currentUser.email}`, JSON.stringify(updatedYt));
    }

    setFolderToDeleteTarget(null);
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNoteTitle.trim() || !newNoteContent.trim()) return;
    const updated = [{ id: Date.now(), title: newNoteTitle.trim(), content: newNoteContent.trim(), folder: selectedNotesFolder }, ...notes];
    setNotes(updated);
    localStorage.setItem(`shiksha_notes_${currentUser.email}`, JSON.stringify(updated));
    setNewNoteTitle('');
    setNewNoteContent('');
  };

  const handleDeleteNote = (id) => {
    const updated = notes.filter((n) => n.id !== id);
    setNotes(updated);
    localStorage.setItem(`shiksha_notes_${currentUser.email}`, JSON.stringify(updated));
  };

  const handleAddYtLink = (e) => {
    e.preventDefault();
    if (!newYtTitle.trim() || !newYtUrl.trim()) return;
    const updated = [{ id: Date.now(), title: newYtTitle.trim(), url: newYtUrl.trim(), folder: selectedYtFolder }, ...ytLinks];
    setYtLinks(updated);
    localStorage.setItem(`shiksha_yt_links_${currentUser.email}`, JSON.stringify(updated));
    setNewYtTitle('');
    setNewYtUrl('');
  };

  const handleDeleteYt = (id) => {
    const updated = ytLinks.filter((y) => y.id !== id);
    setYtLinks(updated);
    localStorage.setItem(`shiksha_yt_links_${currentUser.email}`, JSON.stringify(updated));
  };

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    uploadedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newFile = {
          id: Date.now() + Math.random(),
          name: file.name,
          size: (file.size / 1024).toFixed(1) + ' KB',
          type: file.type,
          dataUrl: event.target.result,
          folder: selectedDriveFolder,
        };
        setFiles((prev) => {
          const updated = [newFile, ...prev];
          localStorage.setItem(`shiksha_files_${currentUser.email}`, JSON.stringify(updated));
          return updated;
        });
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };

  const handleDeleteFile = (id) => {
    const updated = files.filter((f) => f.id !== id);
    setFiles(updated);
    localStorage.setItem(`shiksha_files_${currentUser.email}`, JSON.stringify(updated));
  };

  const handleAddSubject = (e) => {
    e.preventDefault();
    if (!newSubjectName.trim()) return;
    const updated = [...subjects, { id: Date.now(), name: newSubjectName.trim(), attended: 0, total: 0 }];
    setSubjects(updated);
    localStorage.setItem(`shiksha_subjects_${currentUser.email}`, JSON.stringify(updated));
    setNewSubjectName('');
  };

  const markAttendance = (id, present) => {
    const updated = subjects.map((sub) =>
      sub.id === id ? { ...sub, attended: present ? sub.attended + 1 : sub.attended, total: sub.total + 1 } : sub
    );
    setSubjects(updated);
    localStorage.setItem(`shiksha_subjects_${currentUser.email}`, JSON.stringify(updated));
  };

  // Combined folder list for AI Assistant (Drive folders + Notes folders + YouTube folders)
  const allAiFolders = Array.from(new Set([...driveFolders, ...notesFolders, ...ytFolders]));

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'files', label: 'File Drive', icon: '📁' },
    { id: 'notes', label: 'Notes Vault', icon: '📓' },
    { id: 'youtube', label: 'YouTube Library', icon: '📺' },
    { id: 'attendance', label: 'Attendance Tracker', icon: '📈' },
    { id: 'ai-assistant', label: 'AI Study Assistant', icon: '🤖' },
  ];

  const isDark = theme === 'dark';

  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: isDark ? '#020617' : '#f8fafc', color: isDark ? '#f8fafc' : '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
        <div style={{ width: '100%', maxWidth: '420px', backgroundColor: isDark ? '#0f172a' : '#ffffff', border: `1px solid ${isDark ? '#1e293b' : '#cbd5e1'}`, borderRadius: '16px', padding: '36px 32px', boxShadow: '0 12px 32px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '24px', textAlign: 'center' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '24px', color: '#fff', boxShadow: '0 4px 16px rgba(249, 115, 22, 0.4)', marginBottom: '14px' }}>
              S
            </div>
            <h1 style={{ fontSize: '22px', fontWeight: '700', margin: 0, color: isDark ? '#f8fafc' : '#0f172a' }}>ShikshaOS Workspace</h1>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '6px 0 0 0' }}>
              {authMode === 'login' ? 'Welcome back! Log in to continue.' : 'Create an account to get started.'}
            </p>
          </div>

          <div style={{ display: 'flex', backgroundColor: isDark ? '#020617' : '#f1f5f9', padding: '4px', borderRadius: '8px', border: `1px solid ${isDark ? '#1e293b' : '#cbd5e1'}`, marginBottom: '20px' }}>
            <button type="button" onClick={() => { setAuthMode('login'); setAuthError(''); }} style={{ flex: 1, padding: '8px', border: 'none', borderRadius: '6px', backgroundColor: authMode === 'login' ? '#f97316' : 'transparent', color: authMode === 'login' ? '#fff' : '#64748b', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}>
              Sign In
            </button>
            <button type="button" onClick={() => { setAuthMode('signup'); setAuthError(''); }} style={{ flex: 1, padding: '8px', border: 'none', borderRadius: '6px', backgroundColor: authMode === 'signup' ? '#f97316' : 'transparent', color: authMode === 'signup' ? '#fff' : '#64748b', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}>
              Sign Up
            </button>
          </div>

          {authError && (
            <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', padding: '10px 12px', borderRadius: '8px', fontSize: '13px', marginBottom: '16px' }}>
              {authError}
            </div>
          )}

          <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {authMode === 'signup' && (
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#64748b', marginBottom: '6px' }}>Full Name</label>
                <input type="text" placeholder="John Doe" value={authName} required onChange={(e) => setAuthName(e.target.value)} style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: `1px solid ${isDark ? '#334155' : '#cbd5e1'}`, backgroundColor: isDark ? '#020617' : '#f8fafc', color: isDark ? '#fff' : '#0f172a', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }} />
              </div>
            )}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#64748b', marginBottom: '6px' }}>Email Address</label>
              <input type="email" placeholder="student@shiksha.edu" value={authEmail} required onChange={(e) => setAuthEmail(e.target.value)} style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: `1px solid ${isDark ? '#334155' : '#cbd5e1'}`, backgroundColor: isDark ? '#020617' : '#f8fafc', color: isDark ? '#fff' : '#0f172a', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#64748b', marginBottom: '6px' }}>Password</label>
              <input type="password" placeholder="••••••••" value={authPassword} required onChange={(e) => setAuthPassword(e.target.value)} style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: `1px solid ${isDark ? '#334155' : '#cbd5e1'}`, backgroundColor: isDark ? '#020617' : '#f8fafc', color: isDark ? '#fff' : '#0f172a', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }} />
            </div>
            <button type="submit" style={{ width: '100%', padding: '12px', marginTop: '8px', backgroundColor: '#f97316', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '14px' }}>
              {authMode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: isDark ? '#020617' : '#f8fafc', color: isDark ? '#f8fafc' : '#0f172a', fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
      
      {/* Fullscreen File Viewer Overlay */}
      <FullscreenFileViewer
        activeFile={activeViewerFile}
        onClose={() => setActiveViewerFile(null)}
        onDeleteNote={handleDeleteNote}
        onDeleteYt={handleDeleteYt}
        theme={theme}
      />

      {/* Global Custom Folder Delete Modal */}
      {folderToDeleteTarget && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: isDark ? 'rgba(2, 6, 23, 0.85)' : 'rgba(241, 245, 249, 0.85)',
            backdropFilter: 'blur(4px)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              backgroundColor: isDark ? '#0f172a' : '#ffffff',
              border: `1px solid ${isDark ? '#334155' : '#cbd5e1'}`,
              borderRadius: '12px',
              padding: '28px',
              maxWidth: '420px',
              width: '90%',
              textAlign: 'center',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
            }}
          >
            <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', color: isDark ? '#f8fafc' : '#0f172a' }}>
              Delete folder "{folderToDeleteTarget.folder}"?
            </h3>
            <p style={{ margin: '0 0 20px 0', fontSize: '14px', color: isDark ? '#94a3b8' : '#475569' }}>
              This will permanently remove the folder and all files stored inside it.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                onClick={() => setFolderToDeleteTarget(null)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: isDark ? '#334155' : '#cbd5e1',
                  color: isDark ? '#fff' : '#0f172a',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: '600',
                }}
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteFolder}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#dc2626',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: '600',
                }}
              >
                Delete Folder
              </button>
            </div>
          </div>
        </div>
      )}

      <aside style={{ width: '270px', backgroundColor: isDark ? '#0b1120' : '#ffffff', borderRight: `1px solid ${isDark ? '#1e293b' : '#cbd5e1'}`, padding: '24px 16px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', padding: '0 8px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '20px', color: '#fff', boxShadow: '0 4px 12px rgba(249, 115, 22, 0.3)' }}>
            S
          </div>
          <div>
            <h1 style={{ fontSize: '18px', fontWeight: '700', margin: 0, color: isDark ? '#f8fafc' : '#0f172a', letterSpacing: '-0.3px' }}>ShikshaOS</h1>
            <p style={{ fontSize: '12px', color: '#64748b', margin: '2px 0 0 0' }}>Student Workspace</p>
          </div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: isActive ? 'rgba(249, 115, 22, 0.12)' : 'transparent',
                  color: isActive ? '#f97316' : (isDark ? '#94a3b8' : '#475569'),
                  cursor: 'pointer',
                  fontWeight: isActive ? '700' : '500',
                  fontSize: '14px',
                  textAlign: 'left',
                }}
              >
                <span style={{ fontSize: '18px' }}>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: `1px solid ${isDark ? '#1e293b' : '#cbd5e1'}` }}>
          <div style={{ backgroundColor: isDark ? '#0f172a' : '#f8fafc', padding: '12px', borderRadius: '12px', border: `1px solid ${isDark ? '#1e293b' : '#cbd5e1'}`, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: isDark ? '#1e293b' : '#e2e8f0', border: `1px solid ${isDark ? '#334155' : '#cbd5e1'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>
                🎓
              </div>
              <div style={{ overflow: 'hidden' }}>
                <p style={{ margin: 0, fontSize: '13px', fontWeight: '600', color: isDark ? '#f8fafc' : '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{currentUser.name}</p>
                <p style={{ margin: 0, fontSize: '11px', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{currentUser.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: '8px',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                color: '#ef4444',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              🚪 Logout
            </button>
          </div>
        </div>
      </aside>

      <main style={{ flex: 1, padding: '36px', overflowY: 'auto', position: 'relative' }}>
        {activeTab === 'dashboard' && (
          <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px', paddingBottom: '60px' }}>
            <header style={{
              background: isDark ? 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)' : 'linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%)',
              border: `1px solid ${isDark ? '#312e81' : '#c7d2fe'}`,
              borderRadius: '16px',
              padding: '28px 36px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <span style={{ fontSize: '12px', padding: '4px 10px', borderRadius: '20px', backgroundColor: 'rgba(249, 115, 22, 0.2)', color: '#f97316', fontWeight: '700', border: '1px solid rgba(249, 115, 22, 0.3)' }}>ShikshaOS v2.0</span>
                  <span style={{ fontSize: '12px', color: isDark ? '#818cf8' : '#4f46e5' }}>• Student Productivity Hub</span>
                </div>
                <h1 style={{ fontSize: '26px', fontWeight: '800', margin: '0 0 10px 0', color: isDark ? '#fff' : '#0f172a' }}>ShikshaOS Workspace</h1>
                <p style={{ margin: '0 0 6px 0', fontSize: '18px', color: '#fb923c', fontWeight: '700', fontFamily: 'Georgia, serif' }}>
                  " विद्या ददाति विनयं विनयाद् याति पात्रताम् । "
                </p>
                <p style={{ margin: '0 0 4px 0', fontSize: '13px', color: isDark ? '#cbd5e1' : '#334155', fontWeight: '600' }}>
                  हिंदी अर्थ: विद्या विनम्रता देती है, विनम्रता से योग्यता आती है।
                </p>
                <p style={{ margin: 0, fontSize: '13px', color: isDark ? '#a5b4fc' : '#4338ca', fontStyle: 'italic' }}>
                  English Meaning: Knowledge imparts humility; from humility comes worthiness.
                </p>
              </div>
            </header>

            <div style={{ backgroundColor: isDark ? '#0f172a' : '#ffffff', border: `1px solid ${isDark ? '#1e293b' : '#cbd5e1'}`, padding: '24px', borderRadius: '16px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '700', margin: '0 0 10px 0', color: isDark ? '#f8fafc' : '#0f172a' }}>Welcome, {currentUser.name}!</h3>
              <p style={{ color: isDark ? '#94a3b8' : '#475569', margin: 0, lineHeight: '1.6', fontSize: '14px' }}>
                Your workspace is isolated to your account ({currentUser.email}). Folders created in File Drive automatically appear in Notes and YouTube, whereas Notes/YouTube folders remain exclusive to their sections. Use the theme button in the bottom right corner to switch themes.
              </p>
            </div>

            {/* Theme Toggle Button at Lower Right Corner */}
            <div style={{ position: 'absolute', bottom: '24px', right: '36px', zIndex: 100 }}>
              <button
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                style={{
                  padding: '10px 18px',
                  backgroundColor: isDark ? '#f97316' : '#0f172a',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '30px',
                  cursor: 'pointer',
                  fontWeight: '700',
                  fontSize: '13px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                {isDark ? '☀️ Switch to Light Mode' : '🌙 Switch to Dark Mode'}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'files' && (
          <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '700', margin: 0, color: isDark ? '#f8fafc' : '#0f172a' }}>📁 File Drive</h2>

            <FolderHeaderBar
              folders={driveFolders}
              selectedFolder={selectedDriveFolder}
              setSelectedFolder={setSelectedDriveFolder}
              handleRightClickFolder={handleRightClickDriveFolder}
              newFolderName={newDriveFolderName}
              setNewFolderName={setNewDriveFolderName}
              handleAddFolder={handleAddDriveFolder}
              theme={theme}
            />

            <div style={{ backgroundColor: isDark ? '#0f172a' : '#ffffff', padding: '32px', borderRadius: '12px', border: `2px dashed ${isDark ? '#334155' : '#cbd5e1'}`, textAlign: 'center' }}>
              <p style={{ margin: '0 0 14px 0', color: isDark ? '#94a3b8' : '#475569', fontSize: '14px' }}>
                Upload files into <strong style={{ color: '#f97316' }}>{selectedDriveFolder}</strong>
              </p>
              <input type="file" multiple onChange={handleFileUpload} id="file-upload" style={{ display: 'none' }} />
              <label htmlFor="file-upload" style={{ display: 'inline-block', padding: '12px 24px', backgroundColor: '#f97316', color: '#fff', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' }}>
                📤 Choose Files to Upload
              </label>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
              {files.filter((f) => f.folder === selectedDriveFolder).length === 0 ? (
                <div style={{ color: '#64748b', fontSize: '14px' }}>No files uploaded in "{selectedDriveFolder}" folder yet.</div>
              ) : (
                files.filter((f) => f.folder === selectedDriveFolder).map((file) => (
                  <div key={file.id} style={{ backgroundColor: isDark ? '#0f172a' : '#ffffff', border: `1px solid ${isDark ? '#1e293b' : '#cbd5e1'}`, padding: '18px', borderRadius: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h4 style={{ margin: '0 0 6px 0', fontSize: '15px', color: isDark ? '#fff' : '#0f172a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        📁 {file.name}
                      </h4>
                      <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>Size: {file.size}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                      <a href={file.dataUrl} download={file.name} style={{ flex: 1, textAlign: 'center', padding: '8px 10px', backgroundColor: '#2563eb', color: '#fff', textDecoration: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: '600' }}>
                        Download
                      </a>
                      <button onClick={() => handleDeleteFile(file.id)} style={{ padding: '8px 12px', backgroundColor: '#dc2626', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}>
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'notes' && (
          <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '700', margin: 0, color: isDark ? '#f8fafc' : '#0f172a' }}>Notes Vault</h2>
            
            <FolderHeaderBar
              folders={Array.from(new Set([...driveFolders, ...notesFolders]))}
              selectedFolder={selectedNotesFolder}
              setSelectedFolder={setSelectedNotesFolder}
              handleRightClickFolder={handleRightClickNotesFolder}
              newFolderName={newNotesFolderName}
              setNewFolderName={setNewNotesFolderName}
              handleAddFolder={handleAddNotesFolder}
              theme={theme}
            />

            <form onSubmit={handleAddNote} style={{ backgroundColor: isDark ? '#0f172a' : '#ffffff', padding: '20px', borderRadius: '12px', border: `1px solid ${isDark ? '#1e293b' : '#cbd5e1'}`, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input type="text" placeholder={`Note Name / File Title (${selectedNotesFolder})`} value={newNoteTitle} required onChange={(e) => setNewNoteTitle(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${isDark ? '#334155' : '#cbd5e1'}`, backgroundColor: isDark ? '#020617' : '#f8fafc', color: isDark ? '#fff' : '#0f172a', outline: 'none' }} />
              <textarea placeholder="Write note text content here..." value={newNoteContent} required rows={3} onChange={(e) => setNewNoteContent(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${isDark ? '#334155' : '#cbd5e1'}`, backgroundColor: isDark ? '#020617' : '#f8fafc', color: isDark ? '#fff' : '#0f172a', outline: 'none' }} />
              <button type="submit" style={{ alignSelf: 'flex-start', padding: '10px 18px', backgroundColor: '#f97316', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>💾 Save Note File into {selectedNotesFolder}</button>
            </form>

            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: isDark ? '#94a3b8' : '#475569', marginBottom: '14px' }}>Files in "{selectedNotesFolder}":</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
                {notes.filter((n) => n.folder === selectedNotesFolder).length === 0 ? (
                  <div style={{ color: '#64748b', fontSize: '14px' }}>No note files in "{selectedNotesFolder}" yet.</div>
                ) : (
                  notes.filter((n) => n.folder === selectedNotesFolder).map((note) => (
                    <div
                      key={note.id}
                      onClick={() => setActiveViewerFile({ ...note, type: 'note' })}
                      style={{
                        backgroundColor: isDark ? '#0f172a' : '#ffffff',
                        border: `1px solid ${isDark ? '#1e293b' : '#cbd5e1'}`,
                        padding: '16px',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                      }}
                    >
                      <span style={{ fontSize: '28px' }}>📄</span>
                      <h4 style={{ margin: 0, fontSize: '14px', color: isDark ? '#f8fafc' : '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{note.title}.txt</h4>
                      <span style={{ fontSize: '11px', color: '#f97316', fontWeight: '600' }}>Click for fullscreen preview ⤢</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'youtube' && (
          <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '700', margin: 0, color: isDark ? '#f8fafc' : '#0f172a' }}>YouTube Library</h2>

            <FolderHeaderBar
              folders={Array.from(new Set([...driveFolders, ...ytFolders]))}
              selectedFolder={selectedYtFolder}
              setSelectedFolder={setSelectedYtFolder}
              handleRightClickFolder={handleRightClickYtFolder}
              newFolderName={newYtFolderName}
              setNewFolderName={setNewYtFolderName}
              handleAddFolder={handleAddYtFolder}
              theme={theme}
            />

            <form onSubmit={handleAddYtLink} style={{ backgroundColor: isDark ? '#0f172a' : '#ffffff', padding: '20px', borderRadius: '12px', border: `1px solid ${isDark ? '#1e293b' : '#cbd5e1'}`, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input type="text" placeholder={`Video Title / File Name (${selectedYtFolder})`} value={newYtTitle} required onChange={(e) => setNewYtTitle(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${isDark ? '#334155' : '#cbd5e1'}`, backgroundColor: isDark ? '#020617' : '#f8fafc', color: isDark ? '#fff' : '#0f172a', outline: 'none' }} />
              <input type="url" placeholder="YouTube Video URL" value={newYtUrl} required onChange={(e) => setNewYtUrl(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${isDark ? '#334155' : '#cbd5e1'}`, backgroundColor: isDark ? '#020617' : '#f8fafc', color: isDark ? '#fff' : '#0f172a', outline: 'none' }} />
              <button type="submit" style={{ alignSelf: 'flex-start', padding: '10px 18px', backgroundColor: '#ef4444', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>📺 Save Link File into {selectedYtFolder}</button>
            </form>

            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: isDark ? '#94a3b8' : '#475569', marginBottom: '14px' }}>Files in "{selectedYtFolder}":</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
                {ytLinks.filter((y) => y.folder === selectedYtFolder).length === 0 ? (
                  <div style={{ color: '#64748b', fontSize: '14px' }}>No video link files in "{selectedYtFolder}" yet.</div>
                ) : (
                  ytLinks.filter((y) => y.folder === selectedYtFolder).map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setActiveViewerFile({ ...item, type: 'youtube' })}
                      style={{
                        backgroundColor: isDark ? '#0f172a' : '#ffffff',
                        border: `1px solid ${isDark ? '#1e293b' : '#cbd5e1'}`,
                        padding: '16px',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                      }}
                    >
                      <span style={{ fontSize: '28px' }}>📺</span>
                      <h4 style={{ margin: 0, fontSize: '14px', color: isDark ? '#f8fafc' : '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}.yt</h4>
                      <span style={{ fontSize: '11px', color: '#ef4444', fontWeight: '600' }}>Click for fullscreen view ⤢</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'attendance' && (
          <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '700', margin: 0, color: isDark ? '#f8fafc' : '#0f172a' }}>Attendance Tracker</h2>

            <form onSubmit={handleAddSubject} style={{ backgroundColor: isDark ? '#0f172a' : '#ffffff', padding: '20px', borderRadius: '12px', border: `1px solid ${isDark ? '#1e293b' : '#cbd5e1'}`, display: 'flex', gap: '12px' }}>
              <input type="text" placeholder="Enter Subject Name" value={newSubjectName} required onChange={(e) => setNewSubjectName(e.target.value)} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: `1px solid ${isDark ? '#334155' : '#cbd5e1'}`, backgroundColor: isDark ? '#020617' : '#f8fafc', color: isDark ? '#fff' : '#0f172a', outline: 'none' }} />
              <button type="submit" style={{ padding: '12px 20px', backgroundColor: '#f97316', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>+ Add Subject</button>
            </form>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {subjects.map((sub) => {
                const percentage = sub.total > 0 ? ((sub.attended / sub.total) * 100).toFixed(1) : '0.0';
                return (
                  <div key={sub.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: isDark ? '#0f172a' : '#ffffff', padding: '20px', borderRadius: '12px', border: `1px solid ${isDark ? '#1e293b' : '#cbd5e1'}` }}>
                    <div>
                      <h4 style={{ margin: '0 0 6px 0', fontSize: '18px', color: isDark ? '#f8fafc' : '#0f172a' }}>{sub.name}</h4>
                      <p style={{ margin: 0, fontSize: '14px', color: isDark ? '#94a3b8' : '#475569' }}>Attended: {sub.attended} / {sub.total}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <span style={{ fontSize: '20px', fontWeight: 'bold', color: parseFloat(percentage) < 75 ? '#ef4444' : '#22c55e' }}>{percentage}%</span>
                      <button onClick={() => markAttendance(sub.id, true)} style={{ backgroundColor: '#16a34a', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>+ Present</button>
                      <button onClick={() => markAttendance(sub.id, false)} style={{ backgroundColor: '#dc2626', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>+ Absent</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'ai-assistant' && (
          <AiAssistantSection
            currentUser={currentUser}
            folders={allAiFolders}
            selectedFolder={selectedNotesFolder}
            setSelectedFolder={setSelectedNotesFolder}
            handleDeleteFolder={handleRightClickNotesFolder}
            theme={theme}
          />
        )}
      </main>
    </div>
  );
}