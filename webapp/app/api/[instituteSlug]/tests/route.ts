import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Test from '@/lib/models/Test';
import User from '@/lib/models/User';
import Institute from '@/lib/models/Institute';
import Staff from '@/lib/models/Staff';
import Batch from '@/lib/models/Batch';

export async function GET(req: Request, { params }: { params: { instituteSlug: string } }) {
  try {
    await dbConnect();
    // Fetch tests without populate first
    const tests = await Test.find({ instituteId: params.instituteSlug });

    // Fetch all batches for this institute
    const batches = await Batch.find({ instituteId: params.instituteSlug });
    const batchMap = new Map(batches.map(b => [b._id.toString(), b]));

    // Fetch all staff for this institute
    const staff = await Staff.find({ instituteId: params.instituteSlug });
    const staffMap = new Map(staff.map(s => [s._id.toString(), s]));

    // Manually attach batch and teacher info to tests
    const testsWithDetails = tests.map(t => {
      const batch = t.batchId ? batchMap.get(t.batchId.toString()) : null;
      const teacher = t.teacher ? staffMap.get(t.teacher.toString()) : null;
      return {
        ...t.toObject(),
        batchId: batch ? { _id: batch._id, name: batch.name, standard: batch.standard } : null,
        teacher: teacher ? { _id: teacher._id, name: teacher.name } : null
      };
    });

    return NextResponse.json({ success: true, tests: testsWithDetails });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: { instituteSlug: string } }) {
  try {
    await dbConnect();
    const institute = await Institute.findOne({ slug: params.instituteSlug });
    if (!institute) return NextResponse.json({ error: 'Institute not found' }, { status: 404 });

    const headerUserId = req.headers.get('x-user-id');
    if (!headerUserId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await User.findOne({ _id: headerUserId, institute: institute._id });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const allowedRoles = ['owner', 'manager', 'teacher', 'techfly_admin'];
    if (!allowedRoles.includes(user.role)) {
      return NextResponse.json({ error: 'Insufficient permissions to create tests' }, { status: 403 });
    }

    const data = await req.json();
    const test = await Test.create({ ...data, instituteId: params.instituteSlug });
    return NextResponse.json({ success: true, test }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
