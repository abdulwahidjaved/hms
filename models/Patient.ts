import mongoose, { Schema, model, models } from 'mongoose';

const PatientSchema = new Schema({
  patientId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  dob: String,
  gender: String,
  phone: String,
  admissionDate: String,
  priority: { type: String, enum: ['Normal', 'High', 'Urgent'], default: 'Normal' },
  status: { type: String, enum: ['Waiting', 'Admitted', 'In-Treatment'], default: 'Waiting' },
  // new fields for queue UI
  queueNumber: { type: Number },
  assignedStaff: { type: String },
  insuranceProvider: String, 
  insuranceNumber: String
});

export const Patient = models.Patient || model('Patient', PatientSchema);