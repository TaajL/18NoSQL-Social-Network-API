//const express = require('express');
const express = require('express').logRequest;
const router = express.Router();
const userRoutes = require('./userRoutes.js');
const thoughtRoutes = require('./thoughtRoutes.js');

// Custom middleware function to log request details
const logRequest = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
  next(); // Call next to proceed to the next middleware or route handler
};

router.use(logRequest); // Applying the logRequest middleware to all routes below

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;