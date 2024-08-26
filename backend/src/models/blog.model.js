import mongoose from "mongoose";
import { User } from "./user.model.js";
import { Schema } from "mongoose";

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    tag: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    authorName:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
});

export const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
