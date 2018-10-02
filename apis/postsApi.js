const router = require("express").Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/spacebookDB')
const Post = require('./models/postModel');
const Comment = require('./models/commentsModel')

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

// to handle getting all posts and their comments
router.get('', (req, res) => {
    let posts = Post.find()
    Post.find({}).populate('comments').exec((err, posts) => {
        res.send(posts)
    })
})

// to handle adding a post
router.post('', (req, res) => {
    let post = new Post({
        postText: req.body.postText,
        comments: []
    })

    post.save().then(() => {
        Post.find({}).populate('comments').exec((err, posts) => {
            res.send(posts)
        })
    })
})

// to handle deleting a post
router.delete('/:id', (req, res) => {
    let id = req.params.id

    Post.findById(id, (err, post) => {
        for (let i = 0; i < post.comments.length; i++) {
            Comment.remove({ _id: post.comments[i] }, (err) => {
                if (err) console.log(err)
            })
        }
    }).exec(() => {
        Post.remove({ _id: id }, (err, post) => {
            Post.find({}).populate('comments').exec((err, posts) => {
                res.send(posts)
            })
        })
    })
})

module.exports = router