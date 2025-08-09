const postModel = require('../models/post.models')
const generateCaption = require('../services/ai.service');
const uploadFile = require('../services/storage.service');
const { v4: uuidv4 } = require('uuid')

async function createPostController(req, res) {
    const file = req.file;

    // to convert the file which is comming in buffer 
    const base64ImageFile = new Buffer.from(file.buffer).toString('base64');

    // const caption = await generateCaption(base64ImageFile);
    // const upload = await uploadFile(file.buffer, `${uuidv4()}`)

    const [caption, upload] = await Promise.all([
        generateCaption(base64ImageFile),
        uploadFile(file.buffer, `${uuidv4()}`)
    ])

    const post = await postModel.create({
        image: upload.url,
        caption: caption,
        user: req.user._id,
    })

    res.status(201).json({
        message: "Post created successfully!",
        post
    })
}

module.exports = {
    createPostController
}