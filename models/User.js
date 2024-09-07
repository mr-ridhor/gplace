import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema } = mongoose;

const userSchema = new Schema({
  bio: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    title: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    linkedIn: { type: String },
    X: { type: String },
    country: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
  },
  company: {
    name: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    email: { type: String, required: true },
    website: { type: String },
    industry: { type: String, required: true },
    foundingYear: { type: Number, required: true },
    revenue: {
      ltm: { type: Number, required: true }, // Last Twelve Months Revenue
      previousYear: { type: Number, required: true },
    },
    grossProfit: {
      ltm: { type: Number, required: true },
      previousYear: { type: Number, required: true },
    },
    EBITDA: {
      ltm: { type: Number, required: true }, // Last Twelve Months EBITDA
      previousYear: { type: Number, required: true },
    },
  },
  team: {
    team1: { fullName: String, role: String },
    team2: { fullName: String, role: String },
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
}, { timestamps: true });

// Pre-save hook to hash passwords
userSchema.pre('save', async function (next) {
  const user = this;

  try {
    if (!user.isModified('credentials.password')) return next(); // Only hash if password is modified
    const salt = await bcrypt.genSalt(10);
    user.credentials.password = await bcrypt.hash(user.credentials.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Static method to get client metrics required for scoring
userSchema.statics.getClientMetrics = async function (userId) {
  const user = await this.findById(userId).select('company');
  if (!user) throw new Error('User not found');
  const { revenue, EBITDA, industry } = user.company;
  return {
    revenue: revenue.ltm, // Client's latest revenue
    EBITDA: EBITDA.ltm, // Client's latest EBITDA
    industry: user.company.industry, // Client's industry
  };
};

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
