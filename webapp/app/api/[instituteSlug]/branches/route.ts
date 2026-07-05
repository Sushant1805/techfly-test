import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Branch from '@/lib/models/Branch';

export async function GET(req: Request, { params }: { params: { instituteSlug: string } }) {
  try {
    await dbConnect();
    const branches = await Branch.find({ instituteId: params.instituteSlug }).populate('manager', 'name email');
    return NextResponse.json({ success: true, branches });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: { instituteSlug: string } }) {
  try {
    await dbConnect();
    const data = await req.json();
    const branch = await Branch.create({ ...data, instituteId: params.instituteSlug });
    return NextResponse.json({ success: true, branch }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
