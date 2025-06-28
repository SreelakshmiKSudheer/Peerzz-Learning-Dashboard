const express = require('express');
const { register } = require('../controllers/userController');

const userRouter = express.Router();

// // http://localhost:3000/api/user/register
userRouter.post('/register', register);

// // login user
// userRouter.post('/login', (req, res) => {});

// // user logout
// userRouter.post('/logout', (req, res) => {});
// // get user profile
// userRouter.get('/profile', (req, res) => {});

// // update user profile
// userRouter.put('/profile', (req, res) => {});
// // delete user account
// userRouter.delete('/profile', (req, res) => {});
// // get all users
// userRouter.get('/', (req, res) => {});

// // check if user exists
// userRouter.get('/checkuser/:userId', (req, res) => {});

// Export the userRouter
module.exports = userRouter;
