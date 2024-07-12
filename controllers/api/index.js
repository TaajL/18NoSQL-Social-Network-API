const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes.js');

router.use('/users', userRoutes);
router.use("/thoughts", thoughtRoutes);


module.exports = router;