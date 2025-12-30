import connectToDatabase from '@/lib/mongodb';
import { Patient } from '@/models/Patient';
import { NextResponse } from 'next/server';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();
  try {
    const { id } = params;
    const body = await req.json();
    const { status, assignedStaff, queueNumber, phone } = body as any;
    const update: any = {};
    if (status) update.status = status;
    if (assignedStaff) update.assignedStaff = assignedStaff;
    if (queueNumber !== undefined) update.queueNumber = queueNumber;
    if (phone) update.phone = phone;

    const updated = await Patient.findByIdAndUpdate(id, update, { new: true });
    if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(updated);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
