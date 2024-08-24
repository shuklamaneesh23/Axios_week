import mongoose from "mongoose";
import { Blog } from "../models/blog.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const addBlog = async (req, res) => {
    const { title, description, tag } = req.body;

    if (!title || !description || !tag) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    let imageLocalPath;
    if (req.files && Array.isArray(req.files.image) && req.files.image.length > 0) {
        imageLocalPath = req.files.image[0].path;
    }

    const image = await uploadOnCloudinary(imageLocalPath);

    const blog = await Blog.create({
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
        .exec();

    if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json(blog);
}

export { addBlog, getBlogs, getBlogById };