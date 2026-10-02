import React, { useState } from 'react';

export default function AiAssistant() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GROQ_API_KEY;

      if (!apiKey) {
        throw new Error('Missing VITE_GROQ_API_KEY in your .env file');
      }

      // Priority list of active Groq models
      const modelsToTry = [
        'openai/gpt-oss-20b',
        'qwen/qwen3.8-27b',
        'openai/gpt-oss-120b',
      ];

      let replyText = null;
      let lastError = '';

      for (const modelName of modelsToTry) {
        try {
          const response = await fetch(
            'https://api.groq.com/openai/v1/chat/completions',
            {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                model: modelName,
                messages: [{ role: 'user', content: input }],
              }),
            }
          );

          const data = await response.json();

          if (response.ok && data.choices?.[0]?.message?.content) {
            replyText = data.choices[0].message.content;
            break;
          } else {
            lastError = data.error?.message || 'Model call failed';
          }
        } catch (err) {
          lastError = err.message;
        }
      }

      if (!replyText) {
        throw new Error(lastError || 'Could not connect to Groq models.');
      }

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: replyText },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: `Error: ${err.message}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', color: '#ffffff' }}>
        ShikshaOS AI Study Assistant
      </h2>

      <div
        style={{
          border: '1px solid #334155',
          borderRadius: '8px',
          padding: '16px',
          height: '380px',
          overflowY: 'auto',
          marginBottom: '16px',
          backgroundColor: '#0f172a',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        {messages.length === 0 && (
          <p style={{ color: '#94a3b8', textAlign: 'center', margin: 'auto' }}>
            Ask me anything about your study notes or topics!
          </p>
        )}
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              padding: '10px 14px',
              borderRadius: '8px',
              maxWidth: '80%',
              alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
              backgroundColor: msg.role === 'user' ? '#2563eb' : '#1e293b',
              color: '#ffffff',
              border: msg.role === 'user' ? 'none' : '1px solid #334155',
              whiteSpace: 'pre-wrap',
            }}
          >
            {msg.text}
          </div>
        ))}
        {loading && <p style={{ color: '#94a3b8', fontStyle: 'italic' }}>Thinking...</p>}
      </div>

      <form onSubmit={handleSend} style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          style={{
            flex: 1,
            padding: '12px',
            borderRadius: '6px',
            border: '1px solid #334155',
            backgroundColor: '#1e293b',
            color: '#ffffff',
            outline: 'none',
          }}
          placeholder="Type your study question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '12px 24px',
            backgroundColor: '#2563eb',
            color: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600',
            opacity: loading ? 0.6 : 1,
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
}
