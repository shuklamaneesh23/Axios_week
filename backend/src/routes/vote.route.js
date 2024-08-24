import { Router } from "express";
import { upvoteQuestion,downvoteQuestion,upvoteAnswer,downvoteAnswer,getNetVotes,getQuestionsAskedByUser,getAnswersByUser } from "../controllers/vote.controller.js";

const router = Router();

router.route("/upvote/:id").put(upvoteQuestion);
router.route("/downvote/:id").put(downvoteQuestion);
router.route("/upvoteAnswer/:id").put(upvoteAnswer);
router.route("/downvoteAnswer/:id").put(downvoteAnswer);
router.route("/getNetVotes").post(getNetVotes);
router.route("/getQuestionsAskedByUser").post(getQuestionsAskedByUser);
router.route("/getAnswersByUser").post(getAnswersByUser);



export default router;