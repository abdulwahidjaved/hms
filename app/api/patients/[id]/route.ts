import connectToDatabase from '@/lib/mongodb';
import { Patient } from '@/models/Patient';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function GET(req: Request, context: { params: any }) {
  await connectToDatabase();
  try {
    // In Next 13+ the `params` passed to route handlers can be a Promise — await it before accessing
    const { id } = await context.params;
    let patient = null;

    // 1. Try searching by MongoDB ObjectId if the ID format is valid
    if (mongoose.Types.ObjectId.isValid(id)) {
      patient = await Patient.findById(id).lean();
    }

    // 2. Fallback: Search by your custom patientId string (e.g., "P011")
    if (!patient) {
      patient = await Patient.findOne({ patientId: id }).lean();
    }

    if (!patient) {
      return NextResponse.json({ error: 'Patient not found' }, { status: 404 });
    }

    return NextResponse.json(patient);
  } catch (err: any) {
    console.error('GET /api/patients/[id] error', err && (err.message || err));
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}