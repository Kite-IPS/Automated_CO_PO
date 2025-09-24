import mongoose from "mongoose";

const emailVerificationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    token: {
        type: String,
        required: true
    },    
    expiresAt: {
        type: Date,
        required: true
    }
}, { timestamps: true });

const EmailVerification = mongoose.model('EmailVerification', emailVerificationSchema);

export default EmailVerification;