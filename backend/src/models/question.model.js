import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    authorName: {
        type: String,
        required: true,
    }, 
    authorEmail:{
        type: String,
        required: true,
    },
    tags: {
        type: [String],
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
    upvotes: {
        type: Number,
        default: 0,
    }, 
    upvotedBy: {
        type: [String],
        default: [],
    },
    downvotes: {
        type: Number,
        default: 0,
    }, 
    downvotedBy: {
        type: [String],
        default: [],
    },
    answers: [
        {
            authorEmail: {
                type: String,
                required: true,
            },
            authorName: {
                type: String,
                required: true,
            },
            content: { 
                type: String, 
                required: true 
            },
            code:{
                type: String,
                required: false,
            },
            createdAt: { 
                type: Date, 
                default: Date.now 
            },
            updatedAt: { 
                type: Date, 
                default: Date.now 
            },  
            upvotes: { 
                type: Number, 
                default: 0 
            }, 
            upvotedBy: { 
                type: [String], 
                default: []
            },

            downvotes: { 
                type: Number, 
                default: 0 
            },
            downvotedBy: { 
                type: [String], 
                default: [] 
            },
            
        },
    ],
    image: {
        type: String,
        required: false,
    },
    comments: [
        {
            authorEmail: { 
                type: String, 
                required: true 
            },
            authorName: { 
                type: String, 
                required: true 
            },
            content: { type: String, required: true }, 
            createdAt: { type: Date, default: Date.now },
        },
    ],
});

// Use 'Blog' as the collection name
export const Question = mongoose.models.Question || mongoose.model("Question", QuestionSchema);
