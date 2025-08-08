const userModel = require('../models/user.models')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

async function registerController(req, res) {
    const { username, password } = req.body;

    const isUser = await userModel.findOne({
        username
    });
    if (isUser) {
        return res.status(400).json({
            message: "User already exists"
        })
    }
    const user = await userModel.create({
        username,
        password: await bcrypt.hash(password, 10)
    });
    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET)
    res.cookie("token", token)

    return res.status(201).json({
        message: "user created successfully",
        user
    })
}

async function loginController(req, res) {
    const { username, password } = req.body;

    const user = await userModel.findOne({
        username
    })
    if(!user){
        return res.status(400).json({
            message: "user not found"
        })
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword){
        return res.status(400).json({
            message: "Inalid password"
        })
    }

    const token = jwt.sign({
        id:user._id,
    },process.env.JWT_SECRET);
    res.cookie("token",token);

    return res.status(200).json({
        message: "Logged in successfully",
        user:{
            username: user.username,
            id: user._id
        }
    })
}

async function logoutController(req,res){
    
}

module.exports = {
    registerController,
    loginController
}