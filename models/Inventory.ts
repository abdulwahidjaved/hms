import mongoose, { Schema, model, models } from 'mongoose';

const InventorySchema = new Schema({
  itemCode: { type: String, required: true },
  itemName: String,
  category: String,
  quantity: Number,
  minStock: Number,
  expiration: String,
  status: { type: String, default: 'OK' }
});

export const Inventory = models.Inventory || model('Inventory', InventorySchema);