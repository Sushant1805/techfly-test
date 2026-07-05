import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  mobile: { type: String },
  // role: owner, manager, teacher, or techfly_admin
  role: { type: String, enum: ['owner', 'manager', 'teacher', 'techfly_admin'], default: 'teacher' },
  passwordHash: { type: String },
  verified: { type: Boolean, default: false },
  institute: { type: mongoose.Schema.Types.ObjectId, ref: 'Institute', required: true },
  // denormalized institute info for quick access and historical integrity
  instituteId: { type: String, required: true },
  instituteName: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

UserSchema.index({ email: 1, institute: 1 }, { unique: true, sparse: true });
UserSchema.index({ mobile: 1, institute: 1 }, { unique: true, sparse: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
