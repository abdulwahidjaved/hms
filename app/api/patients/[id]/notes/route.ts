import connectToDatabase from '@/lib/mongodb';
import { Patient } from '@/models/Patient';
import { NextResponse } from 'next/server';

export async function POST(req: Request, context: { params: any }) {
  await connectToDatabase();
  try {
    const { id } = await context.params;
    const body = await req.json();
    console.log('POST /api/patients/[id]/notes body:', body);
    const { author, type, description } = body as any;
    if (!author || !description) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

    const note = {
      author,
      type: type || 'Examination',
      description,
      date: new Date(),
      reviewed: false,
      sealed: false
    } as any;

    const patient = await Patient.findById(id);
    if (!patient) return NextResponse.json({ error: 'Patient not found' }, { status: 404 });

    // Defensive: if clinicalNotes is an unexpected type (string), coerce to empty array
    if (!Array.isArray(patient.clinicalNotes)) {
      patient.clinicalNotes = [] as any;
    }

    patient.clinicalNotes.push(note as any);
    await patient.save();

    return NextResponse.json({ note: patient.clinicalNotes[patient.clinicalNotes.length - 1] });
  } catch (err: any) {
    console.error('POST /api/patients/[id]/notes error', err && (err.message || err));
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}