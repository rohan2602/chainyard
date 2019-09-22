const express = require('express');
const router = new express.Router();
const path = require('path');
const userRoutes = require(path.resolve('./routes/userRoutes'));
const todoRoutes = require(path.resolve('./routes/todoRoutes'));
const Auth = require('../controllers/Auth');

router.use('/v1/', userRoutes);

router.use(Auth.verifyToken);
router.use('/v1/', todoRoutes);

module.exports = router;