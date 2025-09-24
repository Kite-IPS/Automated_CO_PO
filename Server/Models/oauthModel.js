import mongoose from "mongoose"

const oauthSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    provider: {
        type: String,
        required: true
    },
    providerId: {
        type: String,
        required: true,
    },
    accessToken: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Oauth = mongoose.model('Oauth', oauthSchema);

export default Oauth;