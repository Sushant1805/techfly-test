import mongoose from 'mongoose';

const BatchSchema = new mongoose.Schema({
  name: { type: String, required: true },
  standard: { type: String, required: true },
  capacity: { type: Number, default: 30 },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' },
  instituteId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Force model re-registration to pick up new schema fields
if (mongoose.models.Batch) {
  delete (mongoose.models as any).Batch;
}

export default mongoose.model('Batch', BatchSchema);
