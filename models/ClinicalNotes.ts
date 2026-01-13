import { Schema } from 'mongoose';

export interface ClinicalNote {
  _id?: any;
  date?: Date;
  author?: string;
  type?: string;
  description?: string;
  reviewed?: boolean;
  sealed?: boolean;
  sealedAt?: Date;
  sealedBy?: string;
  txHash?: string;
}

export const ClinicalNoteSchema = new Schema<ClinicalNote>({
  date: { type: Date, default: () => new Date() },
  author: { type: String },
  type: { type: String },
  description: { type: String },
  reviewed: { type: Boolean, default: false },
  sealed: { type: Boolean, default: false },
  sealedAt: Date,
  sealedBy: String,
  txHash: String
});

export default ClinicalNoteSchema;
