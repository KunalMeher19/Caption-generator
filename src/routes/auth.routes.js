const express = require('express');
const route = express.Router();
const userModel = require('../models/user.models')
const jwt = require('jsonwebtoken')

// POST /register
// POST /login
// GET /user [Protected]

route.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await userModel.create({
            username, password
        })

        const token = jwt.sign({
            id:user._id,
        },process.env.JWT_SECRET)

        res.cookie('token',token)

        res.status(201).json({
        message: "user registerd successfully",
        user
    })
    }catch(err){
        res.status(409).json({
            message: "Error creating the user",
            err: err.errmsg
        })
    }
})

module.exports = route