import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import TestResult from '@/lib/models/TestResult';
import Test from '@/lib/models/Test';
import User from '@/lib/models/User';
import Institute from '@/lib/models/Institute';

// GET - Fetch test results for a specific test
export async function GET(req: Request, { params }: { params: { instituteSlug: string } }) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const testId = searchParams.get('testId');

    if (!testId) {
      return NextResponse.json({ success: false, message: 'Test ID required' }, { status: 400 });
    }

    const results = await TestResult.find({ testId, instituteId: params.instituteSlug })
      .populate('studentId', 'name rollNumber batchId')
      .populate('testId', 'title subject maxMarks');

    return NextResponse.json({ success: true, results });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// POST - Save test results
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
      return NextResponse.json({ error: 'Insufficient permissions to save marks' }, { status: 403 });
    }

    const data = await req.json();
    const { marks } = data;

    if (!marks || !Array.isArray(marks)) {
      return NextResponse.json({ error: 'Invalid marks data' }, { status: 400 });
    }

    // Delete existing results for this test (if any) and insert new ones
    await TestResult.deleteMany({ testId: marks[0].testId, instituteId: params.instituteSlug });

    const results = await TestResult.insertMany(marks);

    return NextResponse.json({ success: true, results, count: results.length });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
