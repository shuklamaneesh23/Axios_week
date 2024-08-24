import { Router } from "express";
import { getBlogs, getBlogById, addBlog } from "../controllers/blog.controller.js";

const router = Router();

router.route("/").get(getBlogs);
router.route("/:id").get(getBlogById);
router.route("/").post(addBlog);

export default router;