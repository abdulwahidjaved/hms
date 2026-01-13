import connectToDatabase from '@/lib/mongodb';
import { Patient } from '@/models/Patient';
import { NextResponse } from 'next/server';

export async function POST(req: Request, context: { params: any }) {
  await connectToDatabase();
  try {
    const { id, noteId } = await context.params;
    const body = await req.json();
    const { op, actor } = body as any;

    if (!op || !['review', 'seal'].includes(op)) return NextResponse.json({ error: 'Invalid operation' }, { status: 400 });

    const patient = await Patient.findById(id);
    if (!patient) return NextResponse.json({ error: 'Patient not found' }, { status: 404 });

    const note = patient.clinicalNotes.id(noteId as any);
    if (!note) return NextResponse.json({ error: 'Note not found' }, { status: 404 });

    if (op === 'review') {
      note.reviewed = true;
      await patient.save();
      return NextResponse.json({ note });
    }

    if (op === 'seal') {
      if (!note.reviewed) return NextResponse.json({ error: 'Note must be reviewed before sealing' }, { status: 400 });
      if (note.sealed) return NextResponse.json({ error: 'Note already sealed' }, { status: 400 });

      note.sealed = true;
      note.sealedAt = new Date();
      note.sealedBy = actor || 'Doctor';
      // TODO: integrate blockchain and set txHash when available

      await patient.save();
      return NextResponse.json({ note });
    }

    return NextResponse.json({ error: 'Unhandled' }, { status: 400 });
  } catch (err: any) {
    console.error('POST /api/patients/[id]/notes/[noteId] error', err && (err.message || err));
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}