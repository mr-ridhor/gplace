import mongoose, { Schema, Document, Model } from 'mongoose';

// Define an interface for the Note document
export interface IEmail extends Document {
    user: mongoose.Types.ObjectId;
    gmail: {
        access_token: string;
        refresh_token: string;
        // scope: string[];
        token_type: string;
        expiry_date: number;
        code: string;
    };
    // customEmail: {
    //     email: string;
    //     imap: {
    //         port: number;

    //     }
    // }
    emailType: string;
}

// Define the Note schema
const emailSchema = new Schema<IEmail>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        gmail: {
            emailAddress:{type: String },
            access_token: {type: String },
            refresh_token: {type: String },
            // scope: [String],
            token_type: {type: String},
            expiry_date: {type: Number},
            code: {type: String}
        },
        emailType: {type: String, enum:["gmail", "custom"], default: 'gmail'}
    },
    { timestamps: true }
);

// Create the Note model or use the existing one
const Email: Model<IEmail> = mongoose.models.Email || mongoose.model<IEmail>('Email', emailSchema);

export default Email;
