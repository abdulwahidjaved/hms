import connectToDatabase from '@/lib/mongodb';
import { RestockRequest } from '@/models/RestockRequest';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  await connectToDatabase();
  try {
    const list = await RestockRequest.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(list);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await connectToDatabase();
  try {
    const body = await req.json();
    const { itemCode, itemName, quantity, urgency, notes, requestedBy } = body as any;
    if (!itemCode || !itemName || !quantity) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

    const rr = await RestockRequest.create({ itemCode, itemName, quantity, urgency, notes, requestedBy });

    // notify any open pages (optional) via BroadcastChannel (client-side listeners will react)
    return NextResponse.json(rr, { status: 201 });
  } catch (err: any) {
    console.error(err && (err.message || err));
    const message = err && err.message && err.message.includes('MONGODB_URI') ? err.message : 'Server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}