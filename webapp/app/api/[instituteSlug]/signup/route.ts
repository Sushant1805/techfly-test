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

    const { name, email, password, mobile, role } = await req.json();
    if (!name || !email || !password || !mobile) {
      return NextResponse.json({ error: 'name, email, mobile, password are required' }, { status: 400 });
    }

    const allowedRoles = ['owner', 'manager', 'teacher', 'techfly_admin'];
    if (role && !allowedRoles.includes(role)) {
      return NextResponse.json({ error: 'Invalid role. Allowed: owner, manager, teacher' }, { status: 400 });
    }

    // Prevent same email/mobile being registered in a different institute
    const conflict = await User.findOne({ $or: [{ mobile }, { email }], institute: { $ne: institute._id } });
    if (conflict) {
      return NextResponse.json({ error: 'User with same mobile/email already exists in another institute' }, { status: 400 });
    }

    // Check if a user already exists for this mobile/email in this institute
    let user = await User.findOne({ $or: [{ mobile }, { email }], institute: institute._id });
    if (user && user.verified) {
      return NextResponse.json({ error: 'User already exists and verified for this institute' }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(password, 8);
    if (user) {
      user.name = name;
      user.email = email;
      user.passwordHash = passwordHash;
      user.verified = false;
      user.role = role || user.role || 'teacher';
      user.institute = institute._id;
      user.instituteId = institute._id.toString();
      user.instituteName = institute.name;
      await user.save();
    } else {
      user = new User({
        name,
        email,
        mobile,
        passwordHash,
        institute: institute._id,
        instituteId: institute._id.toString(),
        instituteName: institute.name,
        verified: false,
        role: role || 'teacher'
      });
      await user.save();
    }

    // Send OTP for signup verification
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
    const otp = new Otp({ mobile, institute: institute._id, codeHash, purpose: 'signup', expiresAt });
    await otp.save();
    try {
      const { sendSms } = await import('@/lib/utils/twilio');
      await sendSms(mobile, `Your signup OTP for ${institute.name} is ${code}`);
    } catch (e) {}

    const response: any = { ok: true, message: 'OTP generated (local)' };
    if (process.env.NODE_ENV !== 'production') response.code = code;
    return NextResponse.json(response);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'server error' }, { status: 500 });
  }
}
