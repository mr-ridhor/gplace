import mongoose, { Document, Model, Schema } from 'mongoose';

// Define the TypeScript interface for Subscription document
export interface ISubscription extends Document {
  user: mongoose.Schema.Types.ObjectId;
  amount: number;
  customerId: string;
  plan: 'Free' | 'Platinum';
  startDate: Date;
  endDate: Date;
  status: 'Active' | 'Expired' | 'Free';
}

// Define the Subscription schema
const subscriptionSchema = new Schema<ISubscription>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    customerId: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      default: 0,
      required: true,
    },
    plan: {
      type: String,
      enum: ['Free', 'Platinum'],
    },
    startDate: { type: Date, default: null }, // Allow null
    endDate: { type: Date, default: null },   // Allow null
    status: {
      type: String,
      enum: ['Active', 'Expired', 'Free'],
    },
  },
  { timestamps: true }
);

// Pre-save hook to set the status
subscriptionSchema.pre('save', function (next) {
  const now = new Date();

  // Check the plan and endDate to determine the status
  if (this.plan === 'Platinum') {
    if (this.endDate && this.endDate < now) {
      this.status = 'Expired';
    } else {
      this.status = 'Active';
    }
  }
  next();
});

// Define the Subscription model with TypeScript types
const Subscription: Model<ISubscription> =
  mongoose.models.Subscription || mongoose.model<ISubscription>('Subscription', subscriptionSchema);

export default Subscription;
