import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/db';
import Institute from '@/lib/models/Institute';
import Otp from '@/lib/models/Otp';

export async function POST(req: Request, { params }: { params: { instituteSlug: string } }) {
  try {
    await connectDB();
    const { instituteSlug } = params;
    const institute = await Institute.findOne({ slug: instituteSlug });
    if (!institute) return NextResponse.json({ error: 'Institute not found' }, { status: 404 });

    const { mobile, purpose = 'login' } = await req.json();
    if (!mobile) return NextResponse.json({ error: 'mobile is required' }, { status: 400 });

    let twilioUnverified = false;
    const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
    let code = randomCode;
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    try {
      const { sendVerification } = await import('@/lib/utils/twilio');
      if (process.env.TWILIO_VERIFY_SERVICE_SID) {
        await sendVerification(mobile, 'sms');
        return NextResponse.json({ ok: true, message: 'OTP sent via Twilio Verify', sent: true });
      }
    } catch (err: any) {
      const msg = err?.message || String(err);
      console.error('Twilio Verify error (falling back to local OTP):', msg);
      if (/unverified|trial accounts cannot send messages/i.test(msg)) {
        twilioUnverified = true;
        console.warn('Twilio trial/unverified number detected — using default OTP 123456');
      }
    }

    // If Twilio indicated trial/unverified, use default OTP
    if (twilioUnverified) code = '123456';
    const codeHash = await bcrypt.hash(code, 8);
    const otp = new Otp({ mobile, institute: institute._id, codeHash, purpose, expiresAt });
    await otp.save();

    let sent = false;
    try {
      const { sendSms } = await import('@/lib/utils/twilio');
      await sendSms(mobile, `Your OTP for ${institute.name} is ${code}`);
      sent = true;
    } catch (err) {
      // ignore
    }

    const response: any = { ok: true, message: 'OTP generated (local)', sent };
    if (process.env.NODE_ENV !== 'production' || twilioUnverified) response.code = code;

    console.log(`OTP for ${mobile} (${purpose}) = ${code}`);
    return NextResponse.json(response);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'server error' }, { status: 500 });
  }
}
