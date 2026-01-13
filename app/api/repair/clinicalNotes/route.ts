import connectToDatabase from '@/lib/mongodb';
import { Patient } from '@/models/Patient';
import { NextResponse } from 'next/server';

// Dev-only repair endpoint to coerce/convert bad clinicalNotes values into arrays.
export async function POST() {
  await connectToDatabase();
  try {
    // Find patients where clinicalNotes is a string
    const docs = await Patient.find({ clinicalNotes: { $type: 'string' } }).lean();
    const summary: any[] = [];

    for (const d of docs) {
      let repaired: any[] = [];
      try {
        // attempt to parse as JSON
        repaired = JSON.parse(d.clinicalNotes as any);
        if (!Array.isArray(repaired)) repaired = [];
      } catch (e) {
        // not JSON — reset to empty
        repaired = [];
      }

      await Patient.findByIdAndUpdate(d._id, { clinicalNotes: repaired as any }, { new: true });
      summary.push({ id: d._id, fixed: true, kept: repaired.length });
    }

    return NextResponse.json({ fixed: summary, count: docs.length });
  } catch (err: any) {
    console.error('POST /api/repair/clinicalNotes error', err && (err.message || err));
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}