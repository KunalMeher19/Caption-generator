const express = require('express');
const route = express.Router();
const multer = require('multer');
const authMiddleware = require('../middlewares/auth.middleware')
const { createPostController } = require('../controllers/post.controller')

const upload = multer({ storage: multer.memoryStorage() })


// POST /api/posts [protected] {img_file}
route.post('/',
    authMiddleware,
    upload.single("image"),
    createPostController
)


module.exports = route;