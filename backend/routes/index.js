const express = require('express');
const router = express.Router();

const userRouter = require('./userRoutes');
const authRouter = require('./authRoutes');
const courseRouter = require('./courseRoutes');
const assignmentRouter = require('./assignmentRoutes');
const quizRouter = require('./quizRoutes');
const enrollmentRouter = require('./enrollmentRoutes');
const notificationRouter = require('./notificationRoutes');
const submissionRouter = require('./submissionRoutes');


// http://localhost:3000/api/user
router.use('/user', userRouter);

// http://localhost:3000/api/auth
router.use('/auth', authRouter);

// http://localhost:3000/api/course
router.use('/course', courseRouter);

// http://localhost:3000/api/assignment
router.use('/assignment', assignmentRouter)

// http://localhost:3000/api/quiz
router.use('/quiz', quizRouter)

// http://localhost:3000/api/enrollment
router.use('/enrollment', enrollmentRouter)

// http://localhost:3000/api/notification
router.use('/notification', notificationRouter)


// http://localhost:3000/api/submission
router.use('/submission', submissionRouter)
module.exports = router;