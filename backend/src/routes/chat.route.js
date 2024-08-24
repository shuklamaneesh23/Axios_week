import { Router } from "express";
import { createChat,getChat,sendMessage,getChatOfAUser } from "../controllers/chat.controller.js";

const router = Router();

router.route("/createChat").post(createChat);
router.route("/:chatId").get(getChat);
router.route("/:chatId/sendMessage").post(sendMessage);
router.route("/getAllChats/:uid").get(getChatOfAUser);


export default router;