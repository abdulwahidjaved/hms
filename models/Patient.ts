import mongoose, { Schema, model, models } from 'mongoose';

const PatientSchema = new Schema({
  patientId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  dob: String,
  gender: String,
  phone: String,
  admissionDate: String,
  priority: { type: String, enum: ['Normal', 'High', 'Urgent'], default: 'Normal' },
  // Keep backward compatibility for existing records that used 'Waiting'
  status: { type: String, enum: ['Waiting', 'Pending', 'Scheduled', 'Admitted', 'In-Treatment', 'Completed'], default: 'Pending' },
  // new fields for queue UI
  queueNumber: { type: Number },
  assignedStaff: { type: String },
  insuranceProvider: String,
  insuranceNumber: String,
  // Patient-reported reason for visit and which doctors they want
  reason: String,
  requestedDoctors: [{ type: String }],
  // clinical notes: array of doctor notes, tests, and treatments
  clinicalNotes: {
    type: [require('./ClinicalNotes').ClinicalNoteSchema],
    default: []
  }
});

export const Patient = models.Patient || model('Patient', PatientSchema);