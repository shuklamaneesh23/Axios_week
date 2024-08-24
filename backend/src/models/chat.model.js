import mongoose from "mongoose";
import { Schema } from "mongoose";

const ChatSchema = new mongoose.Schema({
    participants: {
        type: [Schema.Types.ObjectId],
        ref: "User",
        required: true,
    },
    messages: [
        {
            sender: {
                type: Schema.Types.ObjectId,
                ref: "User",
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
        },
    ],
});

export const Chat = mongoose.models.Chat || mongoose.model("Chat", ChatSchema);