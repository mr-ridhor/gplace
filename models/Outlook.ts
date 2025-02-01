import mongoose, { Document, Model, Schema } from "mongoose";

export interface IOutlookAccount extends Document {
    accessToken: string;
}


const outlookAccountSchema = new mongoose.Schema({
    accessToken: { type: String, required: true },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    username: { type: String, required: true },
    expires_in: { type: Date, required: true },
});


const OutlookAccount = mongoose.models.OutlookAccount || mongoose.model<IOutlookAccount>('OutlookAccount', outlookAccountSchema);

export default OutlookAccount;

