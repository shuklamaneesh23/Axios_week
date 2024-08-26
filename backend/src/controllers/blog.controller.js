import mongoose from "mongoose";
import { Blog } from "../models/blog.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";

const addBlog = async (req, res) => {
    const { title, description, tag,authorName } = req.body;
    console.log(title, description, tag,authorName);
    if (!title || !description || !tag || !authorName) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    //id is uid of user, we need to convert it to ObjectId
    const user
    =await User.findOne({uid:authorName}).exec();
    if(!user){
        return res.status(404).json({message:"User not found"})
    }
    
    let imageLocalPath;
    if (req.files && Array.isArray(req.files.image) && req.files.image.length > 0) {
        imageLocalPath = req.files.image[0].path;
    }

    const image = await uploadOnCloudinary(imageLocalPath);

    const blog = await Blog.create({
        authorName:user._id,
        title,
        description,
        tag,
        image: image?.url || "",
    });

    if (!blog) {
        return res.status(400).json({ message: "Failed to create blog" });
    }

    return res.status(201).json(blog);

}

const getBlogs = async (req, res) => {
    const blogs = await Blog.find().sort({ createdAt: -1 }).exec();
    return res.status(200).json(blogs);
}

const getBlogById = async (req, res) => {
    const { id } = req.params;
    const blog = await Blog
        .findById(id)
        .populate("authorName");

    if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json(blog);
}

const getBlogsByAuthor = async (req, res) => {
    const { authorId } = req.body;
    if (!authorId) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    //id is uid of user, we need to convert it to ObjectId
    const user
    =await User.findOne({uid:authorId}).exec();
    if(!user){
        return res.status(404).json({message:"User not found"})
    }
    const blogs = await Blog
        .find({ authorName: user._id })
        .sort({ createdAt: -1 })
        .populate("authorName")
        .exec();

    return res.status(200).json(blogs);

}



export { addBlog, getBlogs, getBlogById, getBlogsByAuthor };