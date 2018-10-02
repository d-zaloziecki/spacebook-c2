const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const SERVER_PORT = 8080;

mongoose.connect('mongodb://localhost/spacebookDB', function () {
  console.log("DB connection established!!!");
})

const Post = require('./models/postModel');
const Comment = require('./models/commentsModel')

const app = express();
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let post1 = new Post({
  postText: 'hello',
  comments: []
})

// post1.save()

// You will need to create 5 server routes
// These will define your API:

// 1) to handle getting all posts and their comments
app.get('/posts', (req, res) => {
  let posts = Post.find()
  Post.find({}).populate('comments').exec((err, posts) => {
    res.send(posts)
  })
})

// 2) to handle adding a post
app.post('/addPost', (req, res) => {
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

// 3) to handle deleting a post
app.post('/deletePost', (req, res) => {
  let id = req.body.id

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

// 4) to handle adding a comment to a post
app.post('/addComment', (req, res) => {
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

// 5) to handle deleting a comment from a post
app.post('/deleteComment', (req, res) => {
  let commentId = req.body.commentId;
  let postId = req.body.postId;

  Comment.remove({_id: commentId}, (err) => {
    if (err) console.log(err)

    
    Post.findOneAndUpdate({ _id: postId }, { $pull: { comments: commentId } }, (err) => {
      Post.find({}).populate('comments').exec((err, posts) => {
        res.send(posts)
      })
    })
  })
})



app.listen(SERVER_PORT, () => {
  console.log("Server started on port " + SERVER_PORT);
});
