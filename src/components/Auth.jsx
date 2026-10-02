import React, { useState } from 'react';

export default function Auth({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const endpoint = isLogin
      ? 'http://localhost:5000/api/auth/login'
      : 'http://localhost:5000/api/auth/register';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Backend server on port 5000 is not running or route was not found.');
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      localStorage.setItem('shiksha_token', data.token);
      localStorage.setItem('shiksha_user', JSON.stringify(data.user));

      onLoginSuccess(data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#020617',
        color: '#f8fafc',
        fontFamily: 'sans-serif',
        padding: '20px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          backgroundColor: '#0f172a',
          borderRadius: '12px',
          border: '1px solid #1e293b',
          padding: '32px',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* Logo Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '24px',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              backgroundColor: '#f97316',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '20px',
              color: '#ffffff',
            }}
          >
            S
          </div>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: 'bold', margin: 0 }}>
              ShikshaOS
            </h1>
            <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>
              Student Workspace
            </p>
          </div>
        </div>

        <h2
          style={{
            fontSize: '18px',
            fontWeight: '600',
            textAlign: 'center',
            marginBottom: '20px',
            color: '#cbd5e1',
          }}
        >
          {isLogin ? 'Sign in to your account' : 'Create your student account'}
        </h2>

        {error && (
          <div
            style={{
              backgroundColor: '#7f1d1d',
              border: '1px solid #991b1b',
              color: '#fca5a5',
              padding: '10px 14px',
              borderRadius: '8px',
              marginBottom: '16px',
              fontSize: '14px',
              textAlign: 'center',
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {!isLogin && (
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#94a3b8', marginBottom: '6px' }}>
                Username
              </label>
              <input
                type="text"
                required
                placeholder="e.g. RahulSharma"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  border: '1px solid #1e293b',
                  backgroundColor: '#020617',
                  color: '#ffffff',
                  outline: 'none',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                }}
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#94a3b8', marginBottom: '6px' }}>
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="student@domain.com"
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '6px',
                border: '1px solid #1e293b',
                backgroundColor: '#020617',
                color: '#ffffff',
                outline: 'none',
                fontSize: '14px',
                boxSizing: 'border-box',
              }}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#94a3b8', marginBottom: '6px' }}>
              Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '6px',
                border: '1px solid #1e293b',
                backgroundColor: '#020617',
                color: '#ffffff',
                outline: 'none',
                fontSize: '14px',
                boxSizing: 'border-box',
              }}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#f97316',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              fontWeight: '600',
              fontSize: '15px',
              cursor: 'pointer',
              marginTop: '8px',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'Authenticating...' : isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: '14px', color: '#64748b', margin: '24px 0 0 0' }}>
          {isLogin ? "Don't have an account? " : 'Already registered? '}
          <span
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            style={{ color: '#f97316', cursor: 'pointer', fontWeight: '600' }}
          >
            {isLogin ? 'Sign Up' : 'Log In'}
          </span>
        </p>
      </div>
    </div>
  );
}

