import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import connectDB from '@/lib/db';
import Staff from '@/lib/models/Staff';
import Institute from '@/lib/models/Institute';
import User from '@/lib/models/User';

export async function GET(req: Request, { params }: { params: { instituteSlug: string } }) {
  try {
    await connectDB();
    const institute = await Institute.findOne({ slug: params.instituteSlug });
    if (!institute) return NextResponse.json({ error: 'Institute not found' }, { status: 404 });

    const { searchParams } = new URL(req.url);
    const role = searchParams.get('role');
    const branch = searchParams.get('branch');

    const q: Record<string, any> = { institute: institute._id };
    if (role) q.role = role;
    if (branch) q.branch = branch;

    const list = await Staff.find(q).sort({ createdAt: -1 }).limit(200);
    return NextResponse.json({ success: true, staff: list });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'server error' }, { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: { instituteSlug: string } }) {
  try {
    await connectDB();
    const institute = await Institute.findOne({ slug: params.instituteSlug });
    if (!institute) return NextResponse.json({ error: 'Institute not found' }, { status: 404 });

    const formData = await req.formData();
    const headerUserId = req.headers.get('x-user-id');

    if (!headerUserId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const owner = await User.findOne({ _id: headerUserId, institute: institute._id });
    if (!owner || owner.role !== 'owner') {
      return NextResponse.json({ error: 'Only owner can add staff' }, { status: 403 });
    }

    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const email = formData.get('email') as string;
    const role = formData.get('role') as string;
    const branch = formData.get('branch') as string;
    const salaryType = formData.get('salaryType') as string;
    const salaryAmount = formData.get('salaryAmount') as string;

    if (!name || !phone || !role) return NextResponse.json({ error: 'name, phone and role are required' }, { status: 400 });

    const allowedRoles = ['Teacher','HR','Reception','Manager'];
    if (!allowedRoles.includes(role)) return NextResponse.json({ error: 'Invalid role' }, { status: 400 });

    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadDir, { recursive: true });

    const documents = [];
    for (const [key, value] of Array.from(formData.entries())) {
      if (key === 'documents' && value && typeof value !== 'string') {
        const file = value as File;
        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = Date.now() + '-' + Math.round(Math.random() * 1e9) + path.extname(file.name || '');
        await writeFile(path.join(uploadDir, filename), buffer);
        documents.push({ filename: file.name, url: `/uploads/${filename}`, mimetype: file.type });
      }
    }

    const staff = new Staff({
      name,
      phone,
      email,
      role,
      branch,
      salary: salaryType ? { type: salaryType, amount: salaryAmount ? Number(salaryAmount) : undefined } : undefined,
      documents,
      institute: institute._id,
      instituteId: institute._id.toString(),
      instituteName: institute.name,
      createdBy: owner ? owner._id : undefined
    });

    await staff.save();
    return NextResponse.json({ success: true, staff });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'server error' }, { status: 500 });
  }
}
