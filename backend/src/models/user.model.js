import mongoose, { Schema } from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    uid: {
        type: String,
        required: true,
    },
    imageUri: {
        type: String,
        required: false,
    },
    friends: {
        type: [Schema.Types.ObjectId],
        ref: "User",
        default: [],
    },
    frndRequests: {
        type: [Schema.Types.ObjectId],
        ref: "User",
        default: [],
    },
    sentRequests: {
        type: [Schema.Types.ObjectId],
        ref: "User",
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
