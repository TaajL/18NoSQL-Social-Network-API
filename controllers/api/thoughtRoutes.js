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
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// GET /api/thoughts/:id - Retrieve a thought by ID
router.get("/:id", async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id);
    if (!thought) {
      res.status(404).json({ message: "Thought not found" });
    } else {
      res.json(thought);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

//api/thoughts POST route
router.post('/', async (req, res) => {
  try {
    const { thoughtText, username, userId } = req.body;
    const newThought = new Thought({ thoughtText, username, userId });
    const savedThought = await newThought.save();

    // Add the new thought to the user's thoughts array
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.thoughts.push(savedThought._id);
    await user.save();

    res.status(201).json(savedThought);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



// /api/thoughts/:id PUT route - Update a thought by ID
router.put("/:id", async (req, res) => {
  try {
    // Find and update the thought document
    const updatedThought = await Thought.findOneAndUpdate(
      { _id: req.params.id },
      {
        thoughtText: req.body.thoughtText,
        username: req.body.username,
        userId: req.body.userId
      },
      { new: true }
    );

    // If the thought is not found, return a 404 error
    if (!updatedThought) {
      res.status(404).json({ message: "Thought not found" });
      return;
    }

    // Return the updated thought with a 200 OK status
    res.status(200).json(updatedThought);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// /api/thoughts/:id DELETE route - Delete a thought by ID
router.delete("/:id", async (req, res) => {
  try {
    // Find and delete the thought document
    const deletedThought = await Thought.findOneAndDelete({ _id: req.params.id });

    // If the thought is not found, return a 404 error
    if (!deletedThought) {
      res.status(404).json({ message: "Thought not found" });
      return;
    }

    // Remove the thought from the user's thoughts array
    const user = await User.findById(deletedThought.userId);
    if (user) {
      user.thoughts.pull(deletedThought._id);
      await user.save();
    }

    // Return a 200 OK status with a success message
    res.status(200).json({ message: "Thought deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// /api/thoughts/:thoughtId/reactions POST route - Add a reaction to a thought
router.post("/:thoughtId/reactions", async (req, res) => {
  try {
    // Find the thought document and add a new reaction
    const updatedThought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      {
        $push: {
          reactions: {
            reactionBody: req.body.reactionBody,
            username: req.body.username
          }
        }
      },
      { new: true }
    );

    // If the thought is not found, return a 404 error
    if (!updatedThought) {
      res.status(404).json({ message: "Thought not found" });
      return;
    }

    // Return the updated thought with a 200 OK status
    res.status(200).json(updatedThought);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// /api/thoughts/:thoughtId/reactions DELETE route - Remove a reaction from a thought
router.delete("/:thoughtId/reactions/:reactionId", async (req, res) => {
  try {
    // Find the thought document and remove the reaction
    const updatedThought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { _id: req.params.reactionId } } },
      { new: true }
    );

    // If the thought is not found, return a 404 error
    if (!updatedThought) {
      res.status(404).json({ message: "Thought not found" });
      return;
    }

    // Return the updated thought with a 200 OK status
    res.status(200).json(updatedThought);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;