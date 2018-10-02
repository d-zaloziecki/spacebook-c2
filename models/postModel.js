const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let postSchema = new Schema({
    postText: String,
    comments: [{type: Schema.Types.ObjectId, ref: 'comment'}]
});

const Post = mongoose.model('post', postSchema)

module.exports = Post;