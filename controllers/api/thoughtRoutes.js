const express = require('express');
const router = express.Router();
const { Thought, User } = require('../../models/index.js');

// api/thoughts GET route
router.get('/', async (req, res) => {
  try {
    const thoughts = await Thought.find().exec();
    res.json(thoughts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'oop what went wrong' });
  }
});

// api/thoughts POST route
router.post('/', async (req, res) => {
  try {
    const newThought = new Thought({
      thoughtText: req.body.thoughtText,
      username: req.body.username,
      reactions: {
        reactionBody: req.body.reactions.reactionBody,
        username: req.body.reactions.username,
      },
    });
    const savedThought = await newThought.save();
    res.status(201).json(savedThought);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'oops what went wrong' });
  }
});

// api/users/id GET route
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id }).exec();
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.json(user);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'oops what went wrong' });
  }
});

module.exports = router;