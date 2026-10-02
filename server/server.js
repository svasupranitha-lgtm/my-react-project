const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key';

// 1. Database Connection
mongoose
  .connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/shikshaOS', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// 2. Attendance Schema & Model Declaration
const attendanceSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    subjects: [
      {
        id: Number,
        name: String,
        attended: Number,
        total: Number,
      },
    ],
  },
  { timestamps: true }
);

const Attendance = mongoose.models.Attendance || mongoose.model('Attendance', attendanceSchema);

// 3. JWT Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token missing' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// 4. Attendance API Routes

// GET API: Retrieve user's attendance records
app.get('/api/attendance', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id || req.user.email;
    const record = await Attendance.findOne({ userId });
    res.json(record ? record.subjects : []);
  } catch (err) {
    console.error('Error fetching attendance:', err);
    res.status(500).json({ error: 'Failed to fetch attendance' });
  }
});

// POST API: Save or update user's attendance records
app.post('/api/attendance', authenticateToken, async (req, res) => {
  try {
    const { subjects } = req.body;
    const userId = req.user.id || req.user.email;

    if (!Array.isArray(subjects)) {
      return res.status(400).json({ error: 'Subjects must be an array' });
    }

    await Attendance.findOneAndUpdate(
      { userId },
      { userId, subjects },
      { upsert: true, new: true, runValidators: true }
    );

    res.json({ message: 'Attendance saved successfully' });
  } catch (err) {
    console.error('Error saving attendance:', err);
    res.status(500).json({ error: 'Failed to save attendance' });
  }
});

// 5. Server Startup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});