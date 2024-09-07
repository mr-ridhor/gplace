import mongoose from 'mongoose';

const { Schema } = mongoose;

const subscriptionSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  amount: Number,
  plan: { type: String, enum: ['Free', 'Platinum'], default: 'Free' },
  startDate: Date,
  endDate: Date,
  status: { type: String, enum: ['Active', 'Expired', 'Free'], default: 'Free' },
}, { timestamps: true });

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

const Subscription = mongoose.models.Subscription || mongoose.model('Subscription', subscriptionSchema);

export default Subscription;
