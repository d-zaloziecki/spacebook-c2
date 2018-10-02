const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let commentSchema = new Schema({
    commentText: String,
    writerName: String,
    post: {type: Schema.Types.ObjectId, ref: 'post'}
});

const Comments = mongoose.model('comment', commentSchema)

module.exports = Comments;