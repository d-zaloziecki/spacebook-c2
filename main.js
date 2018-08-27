var SpacebookApp = function () {
  return {
    posts: [
      { 
        text: "Hello world", id: 1, comments: [
          { text: "Man, this is a comment!", id:1},
          { text: "Man, this is a comment!", id:2},
          { text: "Man, this is a comment!", id:3}
        ]
      },
      {
        text: "Hello world", id: 2, comments: [
          { text: "Man, this is a comment!", id:4 },
          { text: "Man, this is a comment!" , id:5},
          { text: "Man, this is a comment!" , id:6}
        ]
      },
      {
        text: "Hello world", id: 3, comments: [
          { text: "Man, this is a comment!", id:7 },
          { text: "Man, this is a comment!", id:8 },
          { text: "Man, this is a comment!", id:9 }
        ]
      }
    ],

    // the current id to assign to a post
    currentId: 4,
    $posts: $('.posts'),
    currentCommentId: 10,

    _findPostById: function (id) {
      for (var i = 0; i < this.posts.length; i += 1) {
        if (this.posts[i].id === id) {
          return this.posts[i];
        }
      }
    },

    createPost: function (text) {
      var post = {
        text: text,
        id: this.currentId,
        comments: []
      }

      this.currentId += 1;

      this.posts.push(post);
    },

    renderPosts: function () {
      this.$posts.empty();

      for (var i = 0; i < this.posts.length; i += 1) {
        var post = this.posts[i];

        var commentsContainer = `<div class="comments-container">
                                  <input type="text" class="comment-name">
                                  <button class="btn btn-primary add-comment">Post Comment</button> 
                                  ${this.getCommentsHTML(post)}
                                </div>`;

        this.$posts.append('<div class="post" data-id=' + post.id + '>'
          + '<a href="#" class="remove">remove post </a> ' + '<a href="#" class="show-comments">comments</a> ' + post.text +
          commentsContainer + '</div>');
      }
    },

    removePost: function (postID) {

      var post = this._findPostById(postID);

      this.posts.splice(this.posts.indexOf(post), 1);
    },

    toggleComments: function (currentPost) {
      var $clickedPost = $(currentPost).closest('.post');
      $clickedPost.find('.comments-container').toggleClass('show');
    },
    createComment: function (text, currentPostId) {
      for (let i=0; i<this.posts.length; i++){
        if (this.posts[i].id===currentPostId){
          const comment = {text: text, id: this.currentCommentId}
          this.posts[i].comments.push(comment);
          this.currentCommentId ++;
        }
      } 
    },

    removeComment: function (postId ,commentId) {
      const post = this._findPostById(postId);
      const indexofPost = this.posts.indexOf(post);

      for (let t=0; t<post.comments.length; t++){
        if (commentId===post.comments[t].id){
         
          this.posts[indexofPost].comments.splice(post.comments.indexOf(post.comments[t]), 1);
        }
      }
    },

    getCommentsHTML: function (post) {
      const comments = []
      for (let i=0; i<post.comments.length; i++){
       const comment = '<div class="comment" data-id = '+post.comments[i].id +'>' + post.comments[i].text + ' <a href="#" class="removeComment">remove comment</a></div>';
       comments.push(comment);
      }
      return comments;
    }
  };
}

var app = SpacebookApp();

// immediately invoke the render method
app.renderPosts();

// Events
$('.add-post').on('click', function () {
  var text = $('#post-name').val();

  app.createPost(text);
  app.renderPosts();
});

$('.posts').on('click', '.remove', function () {
  
  var $clickedPost = $(this).closest('.post');
  var postID = $clickedPost.data().id;

  app.removePost(postID);
  app.renderPosts();
});

$('.posts').on('click', '.show-comments', function () {
  app.toggleComments(this);
});


$('.posts').on('click', '.add-comment', function () {
  const currentPostId = $(this).closest('.post').data().id;
  const text = $(this).closest('.comments-container').find('.comment-name').val();
  
  app.createComment(text, currentPostId);
  app.renderPosts();
});

$('.posts').on('click', '.removeComment', function () {
  
  var $clickedPost = $(this).closest('.post');
  var postId = $clickedPost.data().id;
  const commentId = $(this).closest('.comment').data().id;

  app.removeComment(postId, commentId);
  app.renderPosts();
});