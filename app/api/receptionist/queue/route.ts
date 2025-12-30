import connectToDatabase from '@/lib/mongodb';
import { Patient } from '@/models/Patient';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  await connectToDatabase();
  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status');

  // If a status query param is provided, filter by it; otherwise return full queue sorted by queueNumber
  const filter = status ? { status } : {};
  const queue = await Patient.find(filter).sort({ queueNumber: 1 });
  return NextResponse.json(queue);
}

// Allow updating a patient's status from the receptionist UI
export async function PATCH(req: Request) {
  await connectToDatabase();
  try {
    const body = await req.json();
    // Accept either { id, status } or { patientId, status }
    const { id, patientId, status } = body as { id?: string; patientId?: string; status?: string };
    if (!status || (!id && !patientId)) {
      return NextResponse.json({ error: 'Missing id (or patientId) or status' }, { status: 400 });
    }

    let updated;
    if (id) {
      updated = await Patient.findByIdAndUpdate(id, { status }, { new: true });
    } else {
      updated = await Patient.findOneAndUpdate({ patientId }, { status }, { new: true });
    }

    if (!updated) return NextResponse.json({ error: 'Patient not found' }, { status: 404 });
    return NextResponse.json(updated);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}