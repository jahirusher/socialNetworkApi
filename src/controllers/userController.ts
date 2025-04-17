import { Request, Response } from 'express';
import User from '../models/User';

// GET all users
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET a single user
export const getSingleUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      res.status(404).json({ message: 'No user found' });
      return;
    }
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

// POST a new user
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

// PUT to update a user
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
      new: true,
      runValidators: true
    });
    if (!user) {
      res.status(404).json({ message: 'No user found' });
      return;
    }
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

// DELETE a user
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) {
      res.status(404).json({ message: 'No user found' });
      return;
    }
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json(err);
  }
};

// POST a friend to the user's friend list
export const addFriend = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $push: { friends: req.params.friendId } },
      { new: true, runValidators: true }
    );
    if (!user) {
      res.status(404).json({ message: 'No user found' });
      return;
    }
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

// DELETE a friend from the user's friend list
export const removeFriend = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { friends: req.params.friendId } },
      { new: true }
    );
    if (!user) {
      res.status(404).json({ message: 'User Deleted' });
      return;
    }
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};
