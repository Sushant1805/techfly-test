import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Batch from '@/lib/models/Batch';
import Staff from '@/lib/models/Staff';

export async function GET(req: Request, { params }: { params: { instituteSlug: string } }) {
  try {
    await dbConnect();
    console.log('Fetching batches for instituteSlug:', params.instituteSlug);
    
    // First, try to find all batches to debug
    const allBatches = await Batch.find({});
    console.log('All batches in DB:', allBatches.map(b => ({ id: b._id, name: b.name, instituteId: b.instituteId })));
    
    // Try with instituteSlug first (without populate to avoid Staff model issue)
    let batches = await Batch.find({ instituteId: params.instituteSlug });
    console.log('Filtered batches by instituteSlug count:', batches.length);
    
    // If no batches found, try to find the institute by slug and get its ObjectId
    if (batches.length === 0) {
      const Institute = await import('@/lib/models/Institute').then(m => m.default);
      const institute = await Institute.findOne({ slug: params.instituteSlug });
      console.log('Found institute by slug:', institute ? { _id: institute._id, slug: institute.slug } : null);
      
      if (institute) {
        // Try with ObjectId
        batches = await Batch.find({ instituteId: institute._id.toString() });
        console.log('Filtered batches by ObjectId count:', batches.length);
      }
    }
    
    console.log('Final batches count:', batches.length);
    
    return NextResponse.json({ success: true, batches });
  } catch (error: any) {
    console.error('Error fetching batches:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: { instituteSlug: string } }) {
  try {
    await dbConnect();
    const data = await req.json();
    const batch = await Batch.create({ ...data, instituteId: params.instituteSlug });
    return NextResponse.json({ success: true, batch }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
