import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/db';
import User from '@/lib/models/User';
import Institute from '@/lib/models/Institute';
import Otp from '@/lib/models/Otp';

export async function POST(req: Request, { params }: { params: { instituteSlug: string } }) {
  try {
    await connectDB();
    const { instituteSlug } = params;
    const institute = await Institute.findOne({ slug: instituteSlug });
    if (!institute) return NextResponse.json({ error: 'Institute not found' }, { status: 404 });

    const { mobile, password } = await req.json();
    if (!mobile || !password) return NextResponse.json({ error: 'mobile and password required' }, { status: 400 });

    const user = await User.findOne({ mobile, institute: institute._id });
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    const ok = await bcrypt.compare(password, user.passwordHash || '');
    if (!ok) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

    // Send OTP for login verification
    let twilioUnverified = false;
    try {
      const { sendVerification } = await import('@/lib/utils/twilio');
      if (process.env.TWILIO_VERIFY_SERVICE_SID) {
        await sendVerification(mobile, 'sms');
        return NextResponse.json({ ok: true, message: 'OTP sent via Twilio Verify' });
      }
    } catch (err: any) {
      const msg = err?.message || String(err);
      console.error('Twilio Verify error (falling back to local OTP):', msg);
      if (/unverified|trial accounts cannot send messages/i.test(msg)) {
        twilioUnverified = true;
        console.warn('Twilio trial/unverified number detected — using default OTP 123456');
      }
    }

    // Fallback local OTP
    const code = twilioUnverified ? '123456' : Math.floor(100000 + Math.random() * 900000).toString();
    const codeHash = await bcrypt.hash(code, 8);
    const expiresAt = new Date(Date.now() + (parseInt(process.env.OTP_EXPIRES_MINUTES || '5') * 60 * 1000));
    const otp = new Otp({ mobile, institute: institute._id, codeHash, purpose: 'login', expiresAt });
    await otp.save();
    try {
      const { sendSms } = await import('@/lib/utils/twilio');
      await sendSms(mobile, `Your login OTP for ${institute.name} is ${code}`);
    } catch (e) {}

    const response: any = { ok: true, message: 'OTP generated (local)' };
    if (process.env.NODE_ENV !== 'production' || twilioUnverified) response.code = code;
    return NextResponse.json(response);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'server error' }, { status: 500 });
  }
}
