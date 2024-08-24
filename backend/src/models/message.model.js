import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    senderEmail: {
        type: String,
        required: true,
    },
    receiverEmail: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const Message = mongoose.models.Message || mongoose.model("Message", MessageSchema);