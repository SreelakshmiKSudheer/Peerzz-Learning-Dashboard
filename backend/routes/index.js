const express = require('express');
const router = express.Router();

const userRouter = require('./userRoutes');
const authRouter = require('./authRoutes');

// http://localhost:3000/api/user
router.use('/user', userRouter);

// http://localhost:3000/api/auth
router.use('/auth', authRouter);

module.exports = router;