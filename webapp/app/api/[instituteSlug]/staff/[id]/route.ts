import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import connectDB from '@/lib/db';
import Staff from '@/lib/models/Staff';
import Institute from '@/lib/models/Institute';
import User from '@/lib/models/User';

export async function GET(req: Request, { params }: { params: { instituteSlug: string, id: string } }) {
  try {
    await connectDB();
    const institute = await Institute.findOne({ slug: params.instituteSlug });
    if (!institute) return NextResponse.json({ error: 'Institute not found' }, { status: 404 });

    const staff = await Staff.findOne({ _id: params.id, institute: institute._id });
    if (!staff) return NextResponse.json({ error: 'Staff not found' }, { status: 404 });

    return NextResponse.json({ success: true, staff });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'server error' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { instituteSlug: string, id: string } }) {
  try {
    await connectDB();
    const institute = await Institute.findOne({ slug: params.instituteSlug });
    if (!institute) return NextResponse.json({ error: 'Institute not found' }, { status: 404 });

    const staff = await Staff.findOne({ _id: params.id, institute: institute._id });
    if (!staff) return NextResponse.json({ error: 'Staff not found' }, { status: 404 });

    const formData = await req.formData();
    const headerUserId = req.headers.get('x-user-id');

    if (!headerUserId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const owner = await User.findOne({ _id: headerUserId, institute: institute._id });
    if (!owner || owner.role !== 'owner') {
      return NextResponse.json({ error: 'Only owner can edit staff' }, { status: 403 });
    }

    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const email = formData.get('email') as string;
    const role = formData.get('role') as string;
    const branch = formData.get('branch') as string;
    const salaryType = formData.get('salaryType') as string;
    const salaryAmount = formData.get('salaryAmount') as string;

    if (name) staff.name = name;
    if (phone) staff.phone = phone;
    if (email) staff.email = email;
    if (role) {
      const allowedRoles = ['Teacher','HR','Reception','Manager'];
      if (!allowedRoles.includes(role)) return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
      staff.role = role;
    }
    if (branch) staff.branch = branch;
    if (salaryType) staff.salary = { type: salaryType, amount: salaryAmount ? Number(salaryAmount) : undefined };

    const newDocs = [];
    for (const [key, value] of Array.from(formData.entries())) {
      if (key === 'documents' && value && typeof value !== 'string') {
        const file = value as File;
        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = Date.now() + '-' + Math.round(Math.random() * 1e9) + path.extname(file.name);
        await writeFile(path.join(process.cwd(), 'public', 'uploads', filename), buffer);
        newDocs.push({ filename: file.name, url: `/uploads/${filename}`, mimetype: file.type });
      }
    }

    if (newDocs.length) staff.documents = (staff.documents || []).concat(newDocs);

    await staff.save();
    return NextResponse.json({ success: true, staff });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'server error' }, { status: 500 });
  }
}
