import mongoose, { Schema, Document, Model } from 'mongoose';

// Define an interface for the Note document
export interface INote extends Document {
  user: mongoose.Types.ObjectId;
  investor: mongoose.Types.ObjectId;
  title: string;
  body: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the Note schema
const noteSchema = new Schema<INote>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    investor: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create the Note model or use the existing one
const Note: Model<INote> = mongoose.models.Note || mongoose.model<INote>('Note', noteSchema);

export default Note;
