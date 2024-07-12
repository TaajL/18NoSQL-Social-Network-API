const { Router } = require('express');
const { User } = require('/Users/rashaadlogan/bootcamp/18NoSQL-Social-Network-API/models/user.js');

const router = Router();

const handleError = (err, res) => {
  console.error(err);
  res.status(500).send('Something went wrong');
};

// api/users GET route
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    handleError(err, res);
  }
});

// api/users POST route
router.post('/', async (req, res) => {
  try {
    const { username, email } = req.body;

    if (!username || !email) {
      return res.status(400).send('Username and email are required');
    }

    const user = new User({ username, email });
    const result = await user.save();
    res.status(201).json(result);
  } catch (err) {
    handleError(err, res);
  }
});

// api/users/id PUT route
router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { username: req.body.username, email: req.body.email } },
      { new: true }
    );
    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.json(updatedUser);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// api/users/ id DELETE route
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete({ _id: req.params.id });
    if (!deletedUser) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.status(204).json({ message: 'User deleted successfully' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});