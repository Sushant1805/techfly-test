import mongoose from 'mongoose';

const StaffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  role: { type: String, enum: ['Teacher','HR','Reception','Manager'], required: true },
  branch: { type: String },
  salary: {
    type: { type: String, enum: ['fixed','hourly'] },
    amount: { type: Number }
  },
  documents: [{ filename: String, url: String, mimetype: String }],
  institute: { type: mongoose.Schema.Types.ObjectId, ref: 'Institute', required: true },
  // denormalized institute info
  instituteId: { type: String, required: true },
  instituteName: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

// Force model re-registration to pick up new schema fields
if (mongoose.models.Staff) {
  delete (mongoose.models as any).Staff;
}

export default mongoose.model('Staff', StaffSchema);
