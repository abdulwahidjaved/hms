import connectToDatabase from '@/lib/mongodb';
import { Inventory } from '@/models/Inventory';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectToDatabase();
  const items = await Inventory.find({});
  return NextResponse.json(items);
}