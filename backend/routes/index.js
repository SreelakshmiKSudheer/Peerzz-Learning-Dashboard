const express = require('express');
const router = express.Router();

const userRouter = require('./userRoutes');
const authRouter = require('./authRoutes');
const courseRouter = require('./courseRoutes');
const assignmentRouter = require('./assignmentRoutes');

// http://localhost:3000/api/user
router.use('/user', userRouter);

// http://localhost:3000/api/auth
router.use('/auth', authRouter);

// http://localhost:3000/api/course
router.use('/course', courseRouter);

// http://localhost:3000/api/assignment
router.use('/assignment', assignmentRouter)

module.exports = router;