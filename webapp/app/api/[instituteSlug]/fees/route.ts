import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Fee from '@/lib/models/Fee';
import Student from '@/lib/models/Student';

export async function GET(req: Request, { params }: { params: { instituteSlug: string } }) {
  try {
    await dbConnect();
    const fees = await Fee.find({ instituteId: params.instituteSlug }).populate('studentId', 'name phone');
    console.log('Fetched fees:', fees.map(f => ({ id: f._id, amount: f.amount, amountPaid: f.amountPaid, status: f.status })));
    return NextResponse.json({ success: true, fees });
  } catch (error: any) {
    console.error('Error fetching fees:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: { instituteSlug: string } }) {
  try {
    await dbConnect();
    const data = await req.json();
    console.log('Fee collection data received:', data);
    const { studentId, amount, paymentDate, paymentMode, transactionId, notes } = data;

    // Find or create fee record for the student
    let fee = await Fee.findOne({ 
      studentId, 
      instituteId: params.instituteSlug,
      status: { $in: ['Pending', 'Partial'] }
    });

    console.log('Existing fee found:', fee ? { id: fee._id, amount: fee.amount, amountPaid: fee.amountPaid, status: fee.status } : null);

    if (fee) {
      // Update existing fee record
      fee.amountPaid = (fee.amountPaid || 0) + amount;
      fee.paymentDate = paymentDate;
      fee.paymentMode = paymentMode;
      fee.transactionId = transactionId;
      fee.notes = notes;
      
      // Update status based on payment
      if (fee.amountPaid >= fee.amount) {
        fee.status = 'Paid';
      } else {
        fee.status = 'Partial';
      }
      
      await fee.save();
      console.log('Updated fee:', { id: fee._id, amount: fee.amount, amountPaid: fee.amountPaid, status: fee.status });
    } else {
      // Create new fee record - use totalAmount as the fee amount, amount as paid
      // If totalAmount is 0 or not provided, treat amount as the full fee amount (full payment)
      const feeAmount = data.totalAmount && data.totalAmount > 0 ? data.totalAmount : amount;
      fee = await Fee.create({
        studentId,
        amount: feeAmount,
        amountPaid: amount,
        status: amount >= feeAmount ? 'Paid' : 'Partial',
        dueDate: paymentDate,
        paymentDate,
        paymentMode,
        transactionId,
        notes,
        instituteId: params.instituteSlug
      });
      console.log('Created new fee:', { id: fee._id, amount: fee.amount, amountPaid: fee.amountPaid, status: fee.status });
    }

    // Update student's total fees due
    const student = await Student.findById(studentId);
    console.log('Student before update:', { id: student?._id, totalFeesDue: student?.totalFeesDue, feesStatus: student?.feesStatus });
    
    if (student) {
      // Initialize totalFeesDue if it doesn't exist
      if (student.totalFeesDue === undefined || student.totalFeesDue === null) {
        // Calculate from existing fees
        const allFees = await Fee.find({ studentId, instituteId: params.instituteSlug });
        student.totalFeesDue = allFees.reduce((acc, f) => acc + (f.amount - (f.amountPaid || 0)), 0);
      }
      
      student.totalFeesDue = Math.max(0, (student.totalFeesDue || 0) - amount);
      
      // Update student fees status
      const allFees = await Fee.find({ studentId, instituteId: params.instituteSlug });
      const pendingFees = allFees.filter(f => f.status === 'Pending' || f.status === 'Partial');
      
      if (pendingFees.length === 0) {
        student.feesStatus = 'Paid';
      } else if (student.totalFeesDue > 0) {
        student.feesStatus = 'Partial';
      } else {
        student.feesStatus = 'Pending';
      }
      
      await student.save();
      console.log('Student after update:', { id: student._id, totalFeesDue: student.totalFeesDue, feesStatus: student.feesStatus });
    }

    return NextResponse.json({ success: true, fee, student }, { status: 201 });
  } catch (error: any) {
    console.error('Error saving fee:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { instituteSlug: string } }) {
  try {
    await dbConnect();
    const data = await req.json();
    const { feeId, amount, paymentDate, paymentMode, transactionId, notes } = data;

    const fee = await Fee.findById(feeId);
    if (!fee) {
      return NextResponse.json({ success: false, message: 'Fee record not found' }, { status: 404 });
    }

    // Update fee record
    fee.amountPaid = amount;
    fee.paymentDate = paymentDate;
    fee.paymentMode = paymentMode;
    fee.transactionId = transactionId;
    fee.notes = notes;
    
    // Update status based on payment
    if (fee.amountPaid >= fee.amount) {
      fee.status = 'Paid';
    } else if (fee.amountPaid > 0) {
      fee.status = 'Partial';
    } else {
      fee.status = 'Pending';
    }
    
    await fee.save();

    // Update student's total fees due
    const student = await Student.findById(fee.studentId);
    if (student) {
      const allFees = await Fee.find({ studentId: fee.studentId, instituteId: params.instituteSlug });
      const totalDue = allFees.reduce((acc, f) => acc + (f.amount - (f.amountPaid || 0)), 0);
      student.totalFeesDue = Math.max(0, totalDue);
      
      // Update student fees status
      const pendingFees = allFees.filter(f => f.status === 'Pending' || f.status === 'Partial');
      
      if (pendingFees.length === 0) {
        student.feesStatus = 'Paid';
      } else if (student.totalFeesDue > 0) {
        student.feesStatus = 'Partial';
      } else {
        student.feesStatus = 'Pending';
      }
      
      await student.save();
    }

    return NextResponse.json({ success: true, fee, student });
  } catch (error: any) {
    console.error('Error updating fee:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
