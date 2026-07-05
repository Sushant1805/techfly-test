import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Institute from '@/lib/models/Institute';

export async function GET() {
  try {
    await connectDB();
    const list = await Institute.find({}).sort({ createdAt: -1 }).limit(500);
    return NextResponse.json({ ok: true, institutes: list });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const { name, slug } = await req.json();
    if (!name) return NextResponse.json({ error: 'name is required' }, { status: 400 });

    const instituteSlug =
      (slug && slug.toString().trim()) ||
      name.toString().toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');

    const existing = await Institute.findOne({ slug: instituteSlug });
    if (existing) return NextResponse.json({ error: 'Institute already exists' }, { status: 400 });

    const inst = new Institute({ name, slug: instituteSlug });
    await inst.save();
    return NextResponse.json({ ok: true, institute: inst });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'server error' }, { status: 500 });
  }
}
