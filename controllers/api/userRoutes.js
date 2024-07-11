const { Router } = require('express');
const User = require('/Users/rashaadlogan/bootcamp/18NoSQL-Social-Network-API/models/user.js');

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

// api/users/id GET route
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.status(200).json(user);
  } catch (err) {
    handleError(err, res);
  }
});

module.exports = router;