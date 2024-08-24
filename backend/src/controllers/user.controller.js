import { User } from "../models/user.model.js";
import pusher from "../utils/pusher.js";


const addUser = async (req, res) => {
    const { name, email, uid, imageUri } = req.body;
    const user=await User
    .findOne({uid:uid})
    .exec();
    if(user){
        return res.status(400).json({message:"User already exists"})
    }
    const newUser = new User({
        name,
        email,
        uid,
        imageUri,
    });
    await newUser.save();
    res.status(201).json(newUser);
}

const getUserEmailById = async (req, res) => {
    const { uid } = req.params;
    const user = await User
    .findOne({uid:uid})
    .exec();
    if(!user){
        return res.status(404).json({message:"User not found"})
    }
    res.status(200).json(user);
}

const getFriends = async (req, res) => {
    const { uid } = req.params;
    const user = await User
    .findOne({uid:uid})
    .populate("friends")
    .exec();
    if(!user){
        return res.status(404).json({message:"User not found"})
    }
    res.status(200).json(user.friends);
}

const getFriendRequests = async (req, res) => {
    const { uid } = req.params;
    const user = await User
    .findOne({uid:uid})
    .populate("frndRequests")
    .exec();
    if(!user){
        return res.status(404).json({message:"User not found"})
    }
    res.status(200).json(user.frndRequests);
}

const addFriend = async (req, res) => {
    const { uid, fid } = req.body;
    const user = await User
    .findOne({uid:uid})
    .exec();
    const friend = await User
    .findOne({uid:fid})
    .exec();
    if(!user || !friend){
        return res.status(404).json({message:"User not found"})
    }
    user.friends.push(friend._id);
    friend.friends.push(user._id);
    await user.save();
    await friend.save();
    res.status(200).json({message:"Friend added successfully"});
}

const sendFriendRequest = async (req, res) => {
    const { uid, fid } = req.body;
    const user = await User.findOne({ uid: uid }).exec();
    const friend = await User.findOne({ uid: fid }).exec();

    if (!user || !friend) {
        return res.status(404).json({ message: "User not found" });
    }

    user.sentRequests.push(friend._id);
    friend.frndRequests.push(user._id);

    await user.save();
    await friend.save();

    // Trigger Pusher event for the friend request
    pusher.trigger('friend-requests', 'new-request', {
        recipientId: fid, // ID of the friend receiving the request
        count: friend.frndRequests.length, // Updated count of friend requests
    });

    res.status(200).json({ message: "Friend request sent successfully" });
};



const acceptFriendRequest = async (req, res) => {
    const { uid, fid } = req.body;
    const user = await User
    .findOne({uid:uid})
    .exec();
    const friend = await User
    .findOne({uid:fid})
    .exec();
    if(!user || !friend){
        return res.status(404).json({message:"User not found"})
    }
    user.frndRequests.pull(friend._id);
    friend.sentRequests.pull(user._id);
    user.friends.push(friend._id);
    friend.friends.push(user._id);
    await user.save();
    await friend.save();

    // Trigger Pusher event for the friend request
    pusher.trigger('friend-requests', 'new-request', {
        recipientId: uid, // ID of the friend accepting the request
        count: user.frndRequests.length, // Updated count of friend requests
    });

    res.status(200).json({message:"Friend added successfully"});
}

const getUserWhoAreNotFriends = async (req, res) => {
    const { uid } = req.params;
    const user = await User.findOne({ uid: uid }).exec();

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const users = await User.find({ uid: { $ne: uid } }).exec();
    const usersWhoAreNotFriends = users.filter((u) => {
        return !user.friends.includes(u._id) && !user.frndRequests.includes(u._id) && !user.sentRequests.includes(u._id);
    });

    res.status(200).json(usersWhoAreNotFriends);

}



export {addUser,getUserEmailById, getFriends, getFriendRequests,sendFriendRequest, addFriend, acceptFriendRequest,getUserWhoAreNotFriends };