import { Router } from "express";
import { createQuestion,getQuestions,getQuestionById,answerQuestion } from "../controllers/question.controller.js";

import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/").post(
    upload.fields([
        {
            name: "image",
            maxCount: 1
        }
    ]),createQuestion);


router.route("/allQuestions").get(getQuestions);
router.route("/getQuestion/:id").get(getQuestionById);
router.route("/answerQuestion/:id").put(answerQuestion);


export default router;

