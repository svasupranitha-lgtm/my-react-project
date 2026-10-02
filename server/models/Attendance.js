const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    subjects: [
      {
        id: { type: Number, required: true },
        name: { type: String, required: true },
        attended: { type: Number, default: 0 },
        total: { type: Number, default: 0 },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Attendance', attendanceSchema);