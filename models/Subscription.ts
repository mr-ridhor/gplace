import mongoose, { Document, Model, Schema } from 'mongoose';

// Define the TypeScript interface for Subscription document
interface ISubscription extends Document {
  user: mongoose.Schema.Types.ObjectId;
  amount: number;
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
    amount: {
      type: Number,
      required: true,
    },
    plan: {
      type: String,
      enum: ['Free', 'Platinum'],
      default: 'Free',
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['Active', 'Expired', 'Free'],
      default: 'Free',
    },
  },
  { timestamps: true }
);

// Pre-save hook to set the status
subscriptionSchema.pre('save', function (next) {
  const now = new Date();

  // Check the plan and endDate to determine the status
  if (this.plan === 'Free') {
    this.status = 'Free';
  } else if (this.endDate < now) {
    this.status = 'Expired';
  } else {
    this.status = 'Active';
  }

  next();
});

// Define the Subscription model with TypeScript types
const Subscription: Model<ISubscription> =
  mongoose.models.Subscription || mongoose.model<ISubscription>('Subscription', subscriptionSchema);

export default Subscription;
