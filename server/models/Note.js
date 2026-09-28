import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subject: { type: String, default: 'General' },
    content: { type: String, required: true },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model('Note', noteSchema);