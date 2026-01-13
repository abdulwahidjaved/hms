import connectToDatabase from '@/lib/mongodb';
import { PatientImage } from '@/models/PatientImage';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  await connectToDatabase();
  try {
    const { searchParams } = new URL(req.url);
    const patientId = searchParams.get('patientId'); // This will receive "P092"

    const filter: any = {};
    if (patientId) {
      // This matches the patientId field in your DB screenshot
      filter.$or = [{ patientId: patientId }, { patientId: patientId }]; 
    }

    const list = await PatientImage.find(filter).sort({ createdAt: -1 }).lean();
    return NextResponse.json(list);
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await connectToDatabase();
  try {
    const body = await req.json();
    // FIX: Ensure you are destructuring 'patientId' from the request body
    const { patientId, title, image_url } = body as any; 

    if (!patientId || !image_url) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // FIX: Save using the field names shown in your MongoDB screenshot
    const img = await PatientImage.create({ 
      patientId, 
      title: title || "Untitled Scan", 
      image_url 
    });

    return NextResponse.json(img, { status: 201 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}