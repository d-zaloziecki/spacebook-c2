const router = require("express").Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/spacebookDB')
const Post = require('./models/postModel');
const Comment = require('./models/commentsModel')

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

// to handle adding a comment to a post
router.post('', (req, res) => {
    let postId = req.body.postId
    let newComment = new Comment({
        commentText: req.body.commentText,
        writerName: req.body.writerName,
        post: postId
    })

    newComment.save().then(() => {
        Post.findOneAndUpdate({ _id: postId }, { $push: { comments: newComment._id } }, (err) => {
            if (err) console.log(err);

            Post.find({}).populate('comments').exec((err, posts) => {
                res.send(posts)
            })
        })
    })
})

// to handle deleting a comment from a post
router.delete('/:postId/:commentId', (req, res) => {
    let commentId = req.params.commentId;
    let postId = req.params.postId;

    Comment.remove({ _id: commentId }, (err) => {
        if (err) console.log(err)


        Post.findOneAndUpdate({ _id: postId }, { $pull: { comments: commentId } }, (err) => {
            Post.find({}).populate('comments').exec((err, posts) => {
                res.send(posts)
            })
        })
    })
})

module.exports = router