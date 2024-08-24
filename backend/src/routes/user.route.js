import { Router } from "express";
import {getFriends,getUserEmailById,sendFriendRequest,getUserWhoAreNotFriends,addUser, getFriendRequests, addFriend, acceptFriendRequest} from "../controllers/user.controller.js";

const router = Router();

router.route("/addUser").post(addUser);
router.route("/getUserEmailById/:uid").get(getUserEmailById);
router.route("/getUserWhoAreNotFriends/:uid").get(getUserWhoAreNotFriends);
router.route("/getFriends/:uid").get(getFriends);
router.route("/getFriendRequests/:uid").get(getFriendRequests);
router.route("/addFriend").post(addFriend);
router.route("/acceptFriendRequest").post(acceptFriendRequest);
router.route("/sendFriendRequest").post(sendFriendRequest);

export default router;

