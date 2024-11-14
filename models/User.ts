import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IUser extends Document {
  bio: {
    firstName: string;
    lastName: string;
    title: string;
    email?: string;
    phone?: string;
    linkedIn?: string;
    X?: string;
    country: string;
    city: string;
    address: string;
  };
  company: {
    name: string;
    country: string;
    city: string;
    email?: string;
    website?: string;
    industry: string;
    industryType?: string;
    foundingYear: number;
    revenue: {
      ltm: number; // Last Twelve Months Revenue
      previousYear: number;
    };
    grossProfit: {
      ltm: number;
      previousYear: number;
    };
    EBITDA: {
      ltm: number; // Last Twelve Months EBITDA
      previousYear: number;
    };
  };
  team: {
    team1?: { fullName: string; role: string };
    team2?: { fullName: string; role: string };
  };
  credentials: {
    email: string;
    password: string;
    passwordReset?: {
      code: number;
      expiryDate: Date;
    };
    isVerified?: boolean;
    verificationCode?: number;
  };
  role: string
}

const userSchema = new Schema<IUser>({
  bio: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    title: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, },
    linkedIn: { type: String },
    x: { type: String },
    country: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
  },
  company: {
    name: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    email: { type: String, },
    website: { type: String },
    industry: { type: String, required: true }, // ''
    industryType: { type: String, enum:["Financial", "Strategic"], default: ''},
    foundingYear: { type: Number, required: true },
    revenue: {
      ltm: { type: Number, required: true, default: 0 }, // Last Twelve Months Revenue
      previousYear: { type: Number, default: 0 },
    },
    grossProfit: {
      ltm: { type: Number, default: 0 },
      previousYear: { type: Number, default: 0 },
    },
    EBITDA: {
      ltm: { type: Number, required: true, default: 0 }, // Last Twelve Months EBITDA
      previousYear: { type: Number, default: 0 },
    },
  },
  team: {
    team1: { fullName: String, email: String },
    team2: { fullName: String, email: String },
  },
  credentials: {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    passwordReset: {
      code: Number,
      expiryDate: Date,
    },
    isVerified: { type: Boolean, default: false },
    verificationCode: String,
  },
  role: { type: String, enum:["User", "Admin"], default: 'User'}
}, { timestamps: true });

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;