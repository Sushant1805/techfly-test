import twilio from 'twilio';

const SID = process.env.TWILIO_ACCOUNT_SID;
const TOKEN = process.env.TWILIO_AUTH_TOKEN;
const FROM = process.env.TWILIO_FROM; // phone number or Messaging Service SID
const MESSAGING_SERVICE_SID = process.env.TWILIO_MESSAGING_SERVICE_SID;

const missing: string[] = [];
if (!SID) missing.push('TWILIO_ACCOUNT_SID');
if (!TOKEN) missing.push('TWILIO_AUTH_TOKEN');
if (missing.length) {
  console.warn(`Twilio not configured, missing: ${missing.join(', ')}`);
}

const client = (SID && TOKEN) ? twilio(SID, TOKEN) : null;

export async function sendSms(to: string, message: string) {
  if (!client) throw new Error('Twilio client not configured');

  const payload: any = { body: message, to };
  if (MESSAGING_SERVICE_SID) payload.messagingServiceSid = MESSAGING_SERVICE_SID;
  else if (FROM) payload.from = FROM;
  else throw new Error('TWILIO_FROM or TWILIO_MESSAGING_SERVICE_SID must be set');

  return client.messages.create(payload);
}

// Verify API helpers
const VERIFY_SID = process.env.TWILIO_VERIFY_SERVICE_SID;

export async function sendVerification(to: string, channel = 'sms') {
  if (!client) throw new Error('Twilio client not configured');
  if (!VERIFY_SID) throw new Error('TWILIO_VERIFY_SERVICE_SID not set');
  // use v2 Verify API
  return client.verify.v2.services(VERIFY_SID).verifications.create({ to, channel });
}

export async function checkVerification(to: string, code: string) {
  if (!client) throw new Error('Twilio client not configured');
  if (!VERIFY_SID) throw new Error('TWILIO_VERIFY_SERVICE_SID not set');
  // use v2 Verify API
  return client.verify.v2.services(VERIFY_SID).verificationChecks.create({ to, code });
}
