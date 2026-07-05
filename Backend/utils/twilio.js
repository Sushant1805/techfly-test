// Ensure .env is loaded from the project Backend folder when this helper is used directly
try {
  const path = require('path');
  require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
} catch (e) {}
const twilio = require('twilio');

const SID = process.env.TWILIO_ACCOUNT_SID;
const TOKEN = process.env.TWILIO_AUTH_TOKEN;
const FROM = process.env.TWILIO_FROM; // phone number or Messaging Service SID
const MESSAGING_SERVICE_SID = process.env.TWILIO_MESSAGING_SERVICE_SID;

const missing = [];
if (!SID) missing.push('TWILIO_ACCOUNT_SID');
if (!TOKEN) missing.push('TWILIO_AUTH_TOKEN');
if (missing.length) {
  console.warn(`Twilio not configured, missing: ${missing.join(', ')}`);
}

const client = (SID && TOKEN) ? twilio(SID, TOKEN) : null;

async function sendSms(to, message) {
  if (!client) throw new Error('Twilio client not configured');

  const payload = { body: message, to };
  if (MESSAGING_SERVICE_SID) payload.messagingServiceSid = MESSAGING_SERVICE_SID;
  else if (FROM) payload.from = FROM;
  else throw new Error('TWILIO_FROM or TWILIO_MESSAGING_SERVICE_SID must be set');

  return client.messages.create(payload);
}

// Verify API helpers
const VERIFY_SID = process.env.TWILIO_VERIFY_SERVICE_SID;

async function sendVerification(to, channel = 'sms') {
  if (!client) throw new Error('Twilio client not configured');
  if (!VERIFY_SID) throw new Error('TWILIO_VERIFY_SERVICE_SID not set');
  // use v2 Verify API
  return client.verify.v2.services(VERIFY_SID).verifications.create({ to, channel });
}

async function checkVerification(to, code) {
  if (!client) throw new Error('Twilio client not configured');
  if (!VERIFY_SID) throw new Error('TWILIO_VERIFY_SERVICE_SID not set');
  // use v2 Verify API
  return client.verify.v2.services(VERIFY_SID).verificationChecks.create({ to, code });
}

module.exports = { sendSms, sendVerification, checkVerification };
