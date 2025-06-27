const express = require('express');
const router = express.Router();

const userRouter = require('./userRoutes');

// user routes
router.use('/user', userRouter);