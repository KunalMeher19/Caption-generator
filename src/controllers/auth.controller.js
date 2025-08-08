const userModel = require('../models/user.models')
const jwt = require('jsonwebtoken');

async function registerController(req, res) {
    const { username, password } = req.body;

    const isUser = await userModel.findOne({
        username
    });
    if(isUser){
        return res.status(400).json({
            message: "User already exists"
        })
    }
    const user = await userModel.create({
        username,
        password
    });
    const token = jwt.sign({
        id:user._id
    },process.env.JWT_SECRET)
    res.cookie("token",token)

    return res.status(201).json({
        message: "user created successfully",
        user
    })
}

async function loginController(req, res) {

}

module.exports = {
    registerController,
    loginController
}