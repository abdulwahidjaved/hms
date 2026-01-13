import connectToDatabase from '@/lib/mongodb';
import { Inventory } from '@/models/Inventory';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectToDatabase();
    const items = await Inventory.find({});
    return NextResponse.json(items);
  } catch (err: any) {
    console.error('GET /api/inventory error', err && (err.message || err));
    const message = err && err.message && err.message.includes('MONGODB_URI') ? err.message : 'Failed to fetch inventory';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}