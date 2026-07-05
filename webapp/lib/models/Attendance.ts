import mongoose from 'mongoose';

const AttendanceSchema = new mongoose.Schema({
  batchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch', required: true },
  date: { type: String, required: true },
  records: [{
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    status: { type: String, enum: ['Present', 'Absent', 'Late', 'Leave'], default: 'Present' }
  }],

  instituteId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Attendance || mongoose.model('Attendance', AttendanceSchema);
