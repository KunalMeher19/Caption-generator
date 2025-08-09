const userModel = require('../models/user.models')
const jwt = require('jsonwebtoken')

async function authMiddleware (req, res, next){
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized access! Log in again."
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findOne({
            _id: decoded.id
        })

        // This will add the user data as a property into the req, so that downstream middleware or route handlers can access it without recalculating or re-fetching it.
        req.user = user
        
        next()
    } catch (err) {
        return res.status(401).json({
            message: "Invalid token! Please log in again"
        })
    }
}

module.exports = authMiddleware;