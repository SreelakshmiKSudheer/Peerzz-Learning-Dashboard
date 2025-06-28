const express = require('express');
const { register, login } = require('../controllers/authController');

const authRouter = express.Router();

// // http://localhost:3000/api/auth/register
authRouter.post('/register', register);
// // http://localhost:3000/api/auth/login
authRouter.post('/login', login);


module.exports = authRouter;