import mongoose from 'mongoose';

const FeeSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  amount: { type: Number, required: true },
  amountPaid: { type: Number, default: 0 },
  status: { type: String, enum: ['Paid', 'Pending', 'Partial'], default: 'Pending' },
  dueDate: { type: String, required: true },
  paymentDate: { type: String },
  paymentMode: { type: String, enum: ['Cash', 'UPI', 'Bank Transfer', 'Cheque'] },
  transactionId: { type: String },
  notes: { type: String },
  instituteId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Force model re-registration to pick up new schema fields
delete mongoose.models.Fee;
delete mongoose.connection.models.Fee;

export default mongoose.model('Fee', FeeSchema);
