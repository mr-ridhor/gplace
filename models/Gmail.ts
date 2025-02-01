import mongoose, { Schema, Document, Model } from 'mongoose';

// Define an interface for the Note document
export interface IGmail extends Document {
    user: mongoose.Types.ObjectId;
    emailAddress: string;
    gmail: {
        access_token: string;
        refresh_token: string;
        // scope: string[];
        token_type: string;
        expiry_date: number;
        code: string;
    };
    outlook: {
        access_token: string;
        account: {
            homeAccountId: string;
            username: string;
            tenantId: string;
        };
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
const gmailSchema = new Schema<IGmail>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        gmail: {
            access_token: {type: String },
            refresh_token: {type: String },
            // scope: [String],
            token_type: {type: String},
            expiry_date: {type: Number},
            code: {type: String}
        },
        outlook: {
            accessToken: {type: String },
            account: {
                homeAccountId: {type: String},
                username: {type: String},
                tenantId: {type: String},
            },
            // scope: [String],
            tokenType: {type: String},
            expiresOn: { type: Date },
        },
        emailAddress: { type: String },
        emailType: {type: String, enum:["gmail", "outlook", "custom"]}
    },
    { timestamps: true }
);

// Create the Note model or use the existing one
const Gmail: Model<IGmail> = mongoose.models.Gmail || mongoose.model<IGmail>('Gmail', gmailSchema);

export default Gmail;
