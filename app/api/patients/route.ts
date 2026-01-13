import connectToDatabase from '@/lib/mongodb';
import { Patient } from '@/models/Patient';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  await connectToDatabase();
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q');

  // If there's a search term, filter by name or ID. Otherwise, return all.
  const filter = query
    ? { $or: [{ name: new RegExp(query, 'i') }, { patientId: new RegExp(query, 'i') }] }
    : {};

  const patients = await Patient.find(filter);
  return NextResponse.json(patients);
}

// Use this for the Receptionist's Registration form
export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();

    // Combine firstName and lastName into the 'name' field that Mongoose expects
    const processedData: any = {
      ...body,
      name: `${(body.firstName ?? '')} ${(body.lastName ?? '')}`.trim(),
    };

  // Assign a queueNumber: use the current max queueNumber + 1 (or fallback to count+1)
  // only consider documents that already have a queueNumber to avoid undefined values
  const last = await Patient.findOne({ queueNumber: { $exists: true } }).sort({ queueNumber: -1 }).select('queueNumber').lean();
    const count = await Patient.countDocuments();
    const nextQueueNumber = (last && typeof last.queueNumber === 'number') ? last.queueNumber + 1 : (count + 1);
    processedData.queueNumber = processedData.queueNumber ?? nextQueueNumber;

    // Assign a dummy staff member (round-robin from a short list) if not provided
    const staffPool = ['Michael Chen', 'Sarah Johnson', 'Emily Rodriguez', 'Thomas Moore'];
  if (!processedData.assignedStaff || processedData.assignedStaff.trim() === "") {
      // Patient hasn't chosen a doctor, apply Round Robin
      processedData.assignedStaff = staffPool[(processedData.queueNumber - 1) % staffPool.length];
      console.log(`Auto-assigned via Round Robin: ${processedData.assignedStaff}`);
  } else {
    // Patient chose a doctor, keep the selection
    console.log(`Using user-selected doctor: ${processedData.assignedStaff}`);
  }

  // Debug log (server-side) to verify assigned fields during development
  console.log('Creating patient with', { queueNumber: processedData.queueNumber, assignedStaff: processedData.assignedStaff });

  const newPatient = await Patient.create(processedData);
  console.log('Created patient:', { id: newPatient._id, queueNumber: newPatient.queueNumber, assignedStaff: newPatient.assignedStaff });
  return NextResponse.json(newPatient, { status: 201 });
  } catch (error: any) {
    console.error("Registration Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


