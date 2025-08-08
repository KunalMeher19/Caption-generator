const express = require('express');
const route = express.Router();
const userModel = require('../models/user.models')
const jwt = require('jsonwebtoken')
const { registerController, loginController } = require('../controllers/auth.controller')

// POST /register
// POST /login
// GET /user [Protected]

route.post('/register', registerController)
route.post('/login', loginController)

module.exports = route