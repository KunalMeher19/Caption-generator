const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    image: String,
    caption: String,
    user: {
        type: mongoose.Schema.Types.ObjectId, //This is the way to store the user id by giving it a type ObjectId
        ref: "users"
    }
})

const postModel = mongoose.model("post", postSchema);

module.exports = postModel;