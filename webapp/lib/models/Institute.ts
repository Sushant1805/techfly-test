import mongoose from 'mongoose';

const InstituteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Institute || mongoose.model('Institute', InstituteSchema);
