import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import FeeTemplate from '@/lib/models/FeeTemplate';

export async function GET(req: Request, { params }: { params: { instituteSlug: string } }) {
  try {
    await dbConnect();
    const templates = await FeeTemplate.find({ instituteId: params.instituteSlug });
    return NextResponse.json({ success: true, templates });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: { instituteSlug: string } }) {
  try {
    await dbConnect();
    const data = await req.json();
    const template = await FeeTemplate.create({ ...data, instituteId: params.instituteSlug });
    return NextResponse.json({ success: true, template }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
