import mongoose from 'mongoose';

const FeeTemplateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  frequency: { type: String, enum: ['monthly', 'quarterly', 'yearly', 'one-time'], default: 'monthly' },
  description: { type: String },
  institute: { type: mongoose.Schema.Types.ObjectId, ref: 'Institute', required: true },
  instituteId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.FeeTemplate || mongoose.model('FeeTemplate', FeeTemplateSchema);
