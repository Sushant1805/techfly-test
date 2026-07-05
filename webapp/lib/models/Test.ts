import mongoose from 'mongoose';

const TestSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true },
  date: { type: String, required: true },
  batchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch' },
  maxMarks: { type: Number, default: 100 },
  passingMarks: { type: Number, default: 40 },
  duration: { type: Number, default: 60 },
  startTime: { type: String },
  venue: { type: String },
  syllabus: { type: String },
  testType: { type: String },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' },
  instituteId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Force model re-registration to pick up new schema fields
if (mongoose.models.Test) {
  delete (mongoose.models as any).Test;
}

export default mongoose.model('Test', TestSchema);
