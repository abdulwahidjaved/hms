import mongoose, { Schema, model, models } from 'mongoose';

const PatientImageSchema = new Schema({
  // Use patientId as a string to match "P092" from your dashboard/DB
  patientId: { type: String, required: true }, 
  title: { type: String },
  image_url: { type: String }, // To store the Tenor/Cloudinary link
  fileName: { type: String },
  contentType: { type: String },
  data: { type: String }, // For base64 if needed
  createdAt: { type: Date, default: () => new Date() }
});

export const PatientImage = models.PatientImage || model('PatientImage', PatientImageSchema);