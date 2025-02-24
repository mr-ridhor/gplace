import mongoose, { Document, Model } from "mongoose";

export interface IActivityLog extends Document {
    action: string;
    resource: string;
    details: string;
    timestamp: Date
}

const ActivityLogSchema = new mongoose.Schema<IActivityLog>(
  {
    action: { type: String, required: true }, // e.g., "Created User", "Deleted Product"
    resource: { type: String }, // e.g., "User", "Product"
    // resourceId: { type: mongoose.Schema.Types.ObjectId }, // ID of affected resource
    timestamp: { type: Date, default: Date.now },
    // ipAddress: { type: String },
    details: { type: String }, // Optional metadata
  },
  { timestamps: true }
);

const ActivityLog: Model<IActivityLog> = mongoose.model<IActivityLog>("ActivityLog", ActivityLogSchema);

export default ActivityLog;
