import { Router } from "express";
import { getBlogs, getBlogById, addBlog,getBlogsByAuthor } from "../controllers/blog.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/").get(getBlogs);
router.route("/:id").get(getBlogById);
router.route("/").post(upload.fields([
    {
        name: "image",
        maxCount: 1
    }
]), addBlog);
router.route("/getBlogsByAuthor").post(getBlogsByAuthor);

export default router;