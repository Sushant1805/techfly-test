import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Student from '@/lib/models/Student';
import Batch from '@/lib/models/Batch';

export async function GET(req: Request, { params }: { params: { instituteSlug: string } }) {
  try {
    await dbConnect();
    console.log('Fetching students for institute:', params.instituteSlug);
    
    // Fetch students without populate first
    const students = await Student.find({ instituteId: params.instituteSlug });
    console.log('Found students:', students.length);
    
    // Fetch all batches for this institute
    const batches = await Batch.find({ instituteId: params.instituteSlug });
    const batchMap = new Map(batches.map(b => [b._id.toString(), b]));
    
    // Manually attach batch info to students
    const studentsWithBatch = students.map(s => {
      const batch = s.batchId ? batchMap.get(s.batchId.toString()) : null;
      return {
        ...s.toObject(),
        batchId: batch ? { _id: batch._id, name: batch.name, standard: batch.standard } : null
      };
    });
    
    return NextResponse.json({ success: true, students: studentsWithBatch });
  } catch (error: any) {
    console.error('Error fetching students:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: { instituteSlug: string } }) {
  try {
    await dbConnect();
    const data = await req.json();
    const student = await Student.create({ ...data, instituteId: params.instituteSlug });
    return NextResponse.json({ success: true, student }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
