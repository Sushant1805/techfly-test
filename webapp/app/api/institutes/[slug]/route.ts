import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Institute from '@/lib/models/Institute';

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  try {
    await connectDB();
    const inst = await Institute.findOne({ slug: params.slug });
    if (!inst) return NextResponse.json({ error: 'Institute not found' }, { status: 404 });
    return NextResponse.json({ ok: true, institute: inst });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'server error' }, { status: 500 });
  }
}
