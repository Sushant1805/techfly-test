import mongoose from 'mongoose';

const TestResultSchema = new mongoose.Schema({
  testId: { type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  marksObtained: { type: Number, required: true },
  isAbsent: { type: Boolean, default: false },
  remarks: { type: String },
  instituteId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Force model re-registration
if (mongoose.models.TestResult) {
  delete (mongoose.models as any).TestResult;
}

export default mongoose.model('TestResult', TestResultSchema);
