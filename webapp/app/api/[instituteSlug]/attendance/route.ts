import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Attendance from '@/lib/models/Attendance';

export async function GET(req: Request, { params }: { params: { instituteSlug: string } }) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const batchId = searchParams.get('batchId');
    const date = searchParams.get('date');

    const query: any = { instituteId: params.instituteSlug };
    if (batchId) query.batchId = batchId;
    if (date) query.date = date;

    const attendance = await Attendance.find(query).populate('batchId', 'name');
    return NextResponse.json({ success: true, attendance });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}


export async function POST(req: Request, { params }: { params: { instituteSlug: string } }) {
  try {
    await dbConnect();
    const data = await req.json();
    const attendance = await Attendance.create({ ...data, instituteId: params.instituteSlug });
    return NextResponse.json({ success: true, attendance }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
