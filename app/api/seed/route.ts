import connectToDatabase from '@/lib/mongodb';
import { Inventory } from '@/models/Inventory';
import { Patient } from '@/models/Patient';
import { NextResponse } from 'next/server';

export async function POST() {
  await connectToDatabase();

  const sample = [
    { patientId: 'P001', name: 'John Smith', priority: 'Normal', phone: '555-1001', assignedStaff: 'Sarah Johnson', status: 'In-Treatment', queueNumber: 1 },
    { patientId: 'P002', name: 'Maria Garcia', priority: 'Normal', phone: '555-1002', assignedStaff: 'Emily Rodriguez', status: 'Waiting', queueNumber: 2 },
    { patientId: 'P003', name: 'Robert Johnson', priority: 'Urgent', phone: '555-1003', assignedStaff: 'Michael Chen', status: 'In-Treatment', queueNumber: 3 },
    { patientId: 'P004', name: 'Linda Williams', priority: 'Normal', phone: '555-1004', assignedStaff: 'Sarah Johnson', status: 'Waiting', queueNumber: 4 },
    { patientId: 'P006', name: 'Susan Davis', priority: 'High', phone: '555-1006', assignedStaff: 'Michael Chen', status: 'Admitted', queueNumber: 6 },
    { patientId: 'P009', name: 'Michael Moore', priority: 'High', phone: '555-1009', assignedStaff: 'Thomas Moore', status: 'In-Treatment', queueNumber: 9 },
  ];

  // upsert sample data
  const results = [] as any[];
  for (const p of sample) {
    const updated = await Patient.findOneAndUpdate({ patientId: p.patientId }, p, { upsert: true, new: true, setDefaultsOnInsert: true });
    results.push(updated);
  }

  return NextResponse.json({ seeded: results.length, results });
}

export async function GET() {
  await connectToDatabase();

  // 1. Clear existing data (Careful! Only for testing)
  await Inventory.deleteMany({});
  await Patient.deleteMany({});

  // 2. Add Dummy Inventory (Based on your screenshot)
  await Inventory.create([
    { itemCode: 'MED001', itemName: 'Amoxicillin', category: 'Antibiotics', quantity: 50, minStock: 20, status: 'OK' },
    { itemCode: 'SUR022', itemName: 'Surgical Gloves', category: 'Supplies', quantity: 15, minStock: 50, status: 'Low Stock' }
  ]);

  // 3. Add Dummy Patient
  await Patient.create({
    patientId: 'P-1001',
    name: 'John Doe',
    status: 'Waiting',
    priority: 'High'
  });

  return NextResponse.json({ message: "Database Seeded Successfully!" });
}