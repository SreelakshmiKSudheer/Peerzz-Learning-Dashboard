const express = require('express');
const { registerByRole, login, logout } = require('../controllers/authController');

const authRouter = express.Router();

// // http://localhost:3000/api/auth/register
authRouter.post('/register/:role', registerByRole);
// // http://localhost:3000/api/auth/login
authRouter.post('/login', login);

// // http://localhost:3000/api/auth/logout
authRouter.post('/logout', logout);


module.exports = authRouter;