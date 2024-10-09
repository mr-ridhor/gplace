import mongoose, { Document, Schema, Model } from 'mongoose';

// Define the TypeScript interface for the InvestorContact document
export interface IInvestorContact extends Document {
  investor: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  name: string;
  surname: string;
  email: string;
  phone: string;
  title: string;
  contactType: 'Secondary' | 'Primary';
}

// Define the Mongoose schema for InvestorContact
const InvestorContactSchema: Schema<IInvestorContact> = new Schema(
  {
    investor: {
      type: Schema.Types.ObjectId,
      ref: 'Investor',
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    title: { type: String, required: true },
    contactType: { type: String, enum:["Secondary", "Primary"], default: 'Secondary'},
  },
  { timestamps: true }
);

// Create the Mongoose model with the defined schema
const InvestorContact: Model<IInvestorContact> = mongoose.models.InvestorContact || mongoose.model<IInvestorContact>(
  'InvestorContact',
  InvestorContactSchema
);

export default InvestorContact;
