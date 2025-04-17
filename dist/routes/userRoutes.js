"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../models/User"));
const router = express_1.default.Router();
// GET all users
router.get('/', async (req, res) => {
    try {
        const users = await User_1.default.find();
        res.status(200).json(users);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
// GET a user by its _id
router.get('/:userId', async (req, res) => {
    try {
        const user = await User_1.default.findById(req.params.userId)
            .populate('thoughts')
            .populate('friends');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
// POST a new user
router.post('/', async (req, res) => {
    try {
        const user = await User_1.default.create(req.body);
        res.status(201).json(user);
    }
    catch (err) {
        res.status(400).json(err);
    }
});
// PUT to update a user by its _id
router.put('/:userId', async (req, res) => {
    try {
        const user = await User_1.default.findByIdAndUpdate(req.params.userId, req.body, {
            new: true,
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    }
    catch (err) {
        res.status(400).json(err);
    }
});
// DELETE to remove a user by its _id (and associated thoughts)
router.delete('/:userId', async (req, res) => {
    try {
        const user = await User_1.default.findByIdAndDelete(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Optionally, remove associated thoughts
        await Thought.deleteMany({ _id: { $in: user.thoughts } });
        res.status(200).json({ message: 'User deleted' });
    }
    catch (err) {
        res.status(500).json(err);
    }
});
// POST to add a friend to a user's friend list
router.post('/:userId/friends/:friendId', async (req, res) => {
    try {
        const user = await User_1.default.findById(req.params.userId);
        const friend = await User_1.default.findById(req.params.friendId);
        if (!user || !friend) {
            return res.status(404).json({ message: 'User or Friend not found' });
        }
        if (user.friends.includes(friend._id)) {
            return res.status(400).json({ message: 'Already friends' });
        }
        user.friends.push(friend._id);
        await user.save();
        friend.friends.push(user._id);
        await friend.save();
        res.status(200).json({ message: 'Friend added' });
    }
    catch (err) {
        res.status(500).json(err);
    }
});
// DELETE to remove a friend from a user's friend list
router.delete('/:userId/friends/:friendId', async (req, res) => {
    try {
        const user = await User_1.default.findById(req.params.userId);
        const friend = await User_1.default.findById(req.params.friendId);
        if (!user || !friend) {
            return res.status(404).json({ message: 'User or Friend not found' });
        }
        user.friends.pull(friend._id);
        await user.save();
        friend.friends.pull(user._id);
        await friend.save();
        res.status(200).json({ message: 'Friend removed' });
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.default = router;
