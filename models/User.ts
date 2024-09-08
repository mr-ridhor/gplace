import mongoose, { Document, Model, Schema } from 'mongoose';
import crypto from 'crypto';

interface IUser extends Document {
  bio: {
    firstName: string;
    lastName: string;
    title: string;
    email: string;
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
    email: string;
    website?: string;
    industry: string;
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
    verificationCode?: string;
  };
}

const userSchema = new Schema<IUser>({
  // Define the schema as before...
  // ...
}, { timestamps: true });

// Helper function to hash the password
const hashPassword = (password: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(16).toString('hex');
    crypto.pbkdf2(password, salt, 1000, 64, 'sha512', (err, derivedKey) => {
      if (err) reject(err);
      resolve(`${salt}:${derivedKey.toString('hex')}`);
    });
  });
};

// Helper function to validate the password
const validatePassword = (password: string, hash: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const [salt, key] = hash.split(':');
    crypto.pbkdf2(password, salt, 1000, 64, 'sha512', (err, derivedKey) => {
      if (err) reject(err);
      resolve(key === derivedKey.toString('hex'));
    });
  });
};

// Pre-save hook to hash passwords
userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('credentials.password')) return next();
    this.credentials.password = await hashPassword(this.credentials.password);
    next();
  } catch (error) {
    next(error as Error); // Type-cast error to Error or CallbackError
  }
});

// Export the model
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;