"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const thought_1 = __importDefault(require("../models/thought"));
const User_1 = __importDefault(require("../models/User"));
const router = (0, express_1.Router)();
// GET all thoughts
router.get('/', async (req, res) => {
    try {
        const thoughts = await thought_1.default.find();
        res.status(200).json(thoughts);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
// GET a thought by its _id
router.get('/:thoughtId', async (req, res) => {
    try {
        const thought = await thought_1.default.findById(req.params.thoughtId);
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.status(200).json(thought);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
// POST to create a new thought
router.post('/', async (req, res) => {
    try {
        const { thoughtText, username, userId } = req.body;
        const thought = await thought_1.default.create({ thoughtText, username, userId });
        // Add thought to the user's thoughts array
        const user = await User_1.default.findById(userId);
        if (user) {
            user.thoughts.push(thought._id);
            await user.save();
        }
        res.status(201).json(thought);
    }
    catch (err) {
        res.status(400).json(err);
    }
});
// PUT to update a thought by its _id
router.put('/:thoughtId', async (req, res) => {
    try {
        const thought = await thought_1.default.findByIdAndUpdate(req.params.thoughtId, req.body, {
            new: true,
        });
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.status(200).json(thought);
    }
    catch (err) {
        res.status(400).json(err);
    }
});
// DELETE to remove a thought by its _id
router.delete('/:thoughtId', async (req, res) => {
    try {
        const thought = await thought_1.default.findByIdAndDelete(req.params.thoughtId);
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        // Optionally, remove the thought from the user's thoughts array
        await User_1.default.updateMany({ thoughts: thought._id }, { $pull: { thoughts: thought._id } });
        res.status(200).json({ message: 'Thought deleted' });
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.default = router;
