const mongoose = require('mongoose');

const OtpSchema = new mongoose.Schema({
  mobile: { type: String, required: true },
  institute: { type: mongoose.Schema.Types.ObjectId, ref: 'Institute', required: true },
  codeHash: { type: String, required: true },
  purpose: { type: String, enum: ['signup', 'login'], default: 'login' },
  used: { type: Boolean, default: false },
  expiresAt: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});

OtpSchema.index({ mobile: 1, institute: 1, purpose: 1, createdAt: -1 });

module.exports = mongoose.model('Otp', OtpSchema);
