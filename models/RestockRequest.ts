import mongoose, { Schema, model, models } from 'mongoose';

const RestockSchema = new Schema({
  itemCode: { type: String, required: true },
  itemName: { type: String, required: true },
  quantity: { type: Number, required: true },
  urgency: { type: String, enum: ['Low', 'Normal', 'High'], default: 'Normal' },
  notes: String,
  status: { type: String, enum: ['Pending', 'Approved', 'Denied'], default: 'Pending' },
  requestedBy: String,
  createdAt: { type: Date, default: () => new Date() }
});

export const RestockRequest = models.RestockRequest || model('RestockRequest', RestockSchema);