// const { Router } = require('express');
const router = require('express').Router();
const { User } = require('../../models/');

//const router = Router();

// Helper function to handle errors
const handleError = (err, res) => {
  console.error(err);
  res.status(500).send(`Internal Server Error: ${err.message}`);
};

// GET /api/users - Retrieve all users
router.get('/', async (req, res) => {
  console.log("hello")
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    handleError(err, res);
  }
});

// POST /api/users - Create a new user
router.post('/', async (req, res) => {
  try {
    const { username, email } = req.body;

    if (!username || !email) {
      return res.status(400).json({ message: 'Username and email are required' });
    }

    const user = new User({ username, email });
    const result = await user.save();
    res.status(201).json(result);
  } catch (err) {
    handleError(err, res);
  }
});

// GET /api/users/:id - Retrieve a user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.json(user);
    }
  } catch (err) {
    handleError(err, res);
  }
});

// PUT /api/users/:id - Update a user
router.put('/:id', async (req, res) => {
  try {
    const { username, email } = req.body;

    if (!username || !email) {
      return res.status(400).json({ message: 'Username and email are required' });
    }

    const user = await User.findByIdAndUpdate(req.params.id, { username, email }, { new: true });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.json(user);
    }
  } catch (err) {
    handleError(err, res);
  }
});

// DELETE /api/users/:id - Delete a user
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.status(204).json({ message: 'User deleted successfully' });
    }
  } catch (err) {
    handleError(err, res);
  }
});

// POST /api/users/:userId/addFriend/:friendId - Add a friend to a user
router.post('/:userId/addFriend/:friendId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const friendId = req.params.friendId;

    // if (!mongoose.isValidObjectId(userId) || !mongoose.isValidObjectId(friendId)) {
    //   return res.status(400).json({ message: 'Invalid user or friend ID' });
    // }

    const user = await User.findByIdAndUpdate(userId, { $push: { friends: friendId } }, { new: true });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.json(user);
    }
  } catch (err) {
    handleError(err, res);
  }
});

// DELETE /api/users/:userId/removeFriend/:friendId - Remove a friend from a user
router.delete('/:userId/removeFriend/:friendId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const friendId = req.params.friendId;

    // Find the user and remove the friend from their friends list
    const user = await User.findByIdAndUpdate(userId, { $pull: { friends: friendId } }, { new: true });

    // Handle user not found
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.json(user);
    }
  } catch (err) {
    handleError(err, res);
  }
});

module.exports = router