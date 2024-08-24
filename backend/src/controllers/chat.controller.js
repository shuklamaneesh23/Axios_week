import mongoose from "mongoose";
import {Chat} from "../models/chat.model.js";
import {User} from "../models/user.model.js";
import Pusher from "pusher";


const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
    secret: process.env.PUSHER_APP_SECRET,
    cluster: process.env.PUSHER_APP_CLUSTER,
    useTLS: true,
  });


const createChat = async (req, res) => {
    //take the participants from the request body and check if the same participant exist for a chat in the database
    const { participants } = req.body;
    console.log("participants", participants);
    //the ids if the participants are uid of the users,so find _id of the users
    //check if the chat already exists

    const users = await User.find({ uid: { $in: participants } });
    console.log("users", users);
    const userIds = users.map((user) => user._id);
    console.log("userIds", userIds);
    const chat = await Chat.findOne({ participants: { $all: userIds } });
    if (chat) {
        return res.status(200).json({ chat });
    }
    const newChat = new Chat({ participants: userIds });
    await newChat.save();
    res.status(201).json({ chat: newChat });
}

const getChat = async (req, res) => {
    const { chatId } = req.params;
    const chat = await Chat.findById(chatId)
    .populate("participants")
    .exec();
    if (!chat) {
        return res.status(404).json({ message: "Chat not found" });
    }
    res.status(200).json({ chat });
}


const sendMessage = async (req, res) => {
    const { chatId } = req.params;
    const { sender, content } = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(chatId)) {
            return res.status(400).json({ message: "Invalid chat ID format" });
        }

        if (!mongoose.Types.ObjectId.isValid(sender)) {
            return res.status(400).json({ message: "Invalid sender ID format" });
        }

        if (typeof content !== 'string' || content.trim() === '') {
            return res.status(400).json({ message: "Invalid message content" });
        }

        const chat = await Chat.findById(chatId);
        if (!chat) {
            return res.status(404).json({ message: "Chat not found" });
        }

        chat.messages.push({ sender, content });
        await chat.save();

        const message = chat.messages[chat.messages.length - 1];

        // Trigger Pusher event
        pusher.trigger(`chat-${chatId}`, "new-message", {
            message,
        });

        res.status(201).json({ message });

    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

const getChatOfAUser = async (req, res) => {
    const { uid } = req.params;
    const user = await User.findOne({ uid: uid }).exec();
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const chats = await Chat.find({ participants: user._id })
        .populate("participants")
        .exec();

    res.status(200).json({ chats });
};


export { createChat, getChat, sendMessage,getChatOfAUser };


