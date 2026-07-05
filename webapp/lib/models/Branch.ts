import mongoose from 'mongoose';

const BranchSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String },
  manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  institute: { type: mongoose.Schema.Types.ObjectId, ref: 'Institute', required: true },
  instituteId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Branch || mongoose.model('Branch', BranchSchema);
