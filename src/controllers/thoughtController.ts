import { Request, Response } from 'express';
import User from '../models/User';
import Thought from '../models/thought';

// GET all thoughts
export const getThoughts = async (req: Request, res: Response): Promise<void> => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET a single thought
export const getSingleThought = async (req: Request, res: Response): Promise<void> => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      res.status(404).json({ message: 'No thought found' });
      return;
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// POST a new thought and add it to a user
export const createThought = async (req: Request, res: Response): Promise<void> => {
  try {
    const thought = await Thought.create(req.body);
    await User.findOneAndUpdate(
      { username: req.body.username },
      { $push: { thoughts: thought._id } },
      { new: true }
    );
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// PUT to update a thought
export const updateThought = async (req: Request, res: Response): Promise<void> => {
  try {
    const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, {
      new: true,
      runValidators: true
    });
    if (!thought) {
      res.status(404).json({ message: 'No thought found' });
      return;
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// DELETE a thought
export const deleteThought = async (req: Request, res: Response): Promise<void> => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
    if (!thought) {
      res.status(404).json({ message: 'No thought found' });
      return;
    }

    await User.findOneAndUpdate(
      { username: thought.username },
      { $pull: { thoughts: req.params.thoughtId } }
    );

    res.json({ message: 'Thought deleted' });
  } catch (err) {
    res.status(500).json(err);
  }
};

// POST a reaction
export const addReaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $push: { reactions: req.body } },
      { new: true, runValidators: true }
    );
    if (!thought) {
      res.status(404).json({ message: 'No thought found' });
      return;
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// DELETE a reaction
export const removeReaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    );
    if (!thought) {
      res.status(404).json({ message: 'No thought found' });
      return;
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};
