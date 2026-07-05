import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String, required: true },
  rollNumber: { type: String },
  standard: { type: String },
  batchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch' },
  instituteId: { type: String, required: true },
  parentName: { type: String },
  parentPhone: { type: String },
  address: { type: String },
  status: { type: String, enum: ['Active', 'Inactive', 'On Leave'], default: 'Active' },
  feesStatus: { type: String, enum: ['Paid', 'Pending', 'Partial'], default: 'Pending' },
  attendancePercent: { type: Number },
  lastPaymentDate: { type: String },
  totalFeesDue: { type: Number, default: 0 },
  photo: { type: String },
  gender: { type: String },
  dob: { type: String },
  parentRelation: { type: String },
  subjects: [{ type: String }],
  lastTestScore: {
    subject: String,
    score: Number,
    total: Number
  },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now }
});

// Force model re-registration to pick up new schema fields
if (mongoose.models.Student) {
  delete (mongoose.models as any).Student;
}

export default mongoose.model('Student', StudentSchema);
