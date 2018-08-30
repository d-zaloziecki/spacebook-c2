const posts = [];
const postScreen = $('.posts');

const renderPosts = function () {
  postScreen.empty();

  for (let i of posts) {
    const postHtml = "<div class='posted' data-id=" + i.id + ">" +
      "<button type='button' class='removePost btn btn-primary'>REMOVE</button> <br/><a href='#' class='link'> "
      + i.text + "</a> <div class='comments'></div>" +
      "<form class='writeComment'>" +
      "<input type='text' class='commentUsername' placeholder='Username' />" +
      "<br/> <input type='text' class='commentText' placeholder='Write your comment' />" +
      "<br/> <button type='button' class='btn btn-primary postComment'>Comment</button>" +
      "</form>" +
      "</div>";
    postScreen.append(postHtml)

    const commentScreen = $(".posted[data-id='" + i.id + "']").find('.comments');
    commentScreen.empty();
    for (let t of i.comment) {
      const commentHtml = "<div class='comment' data-commentid=" + t.commentId +
        "> Username: " + t.commentUsername +
        "<br/> comment: " + t.commentText +
        "<br/> <button type='button' class='btn btn-primary removeComment'>REMOVE COMMENT</button> <div/>"
      commentScreen.append(commentHtml)
    }
  }

}

let id = 0;
const addPost = function () {
  posts.push({
    "text": $('#post-name').val(),
    "id": id,
    "comment": []
  })
  id++
  renderPosts();
}

$('.add-post').on("click", addPost)

const removePost = function () {
  const itemRemoved = $(this).closest(".posted").data().id;
  for (let i in posts) {
    if (posts[i].id == itemRemoved) {
      posts.splice(i, 1)
    }
  }
  renderPosts();
}

$('.posts').on('click', '.removePost', removePost);

let commentId = 0;
const comment = function () {
  const commentText = $(this).closest(".posted").find(".commentText").val();
  const commentUsername = $(this).closest(".posted").find(".commentUsername").val();
  const commentsPostId = $(this).closest(".posted").data().id;

  for (let i of posts) {
    if (i.id == commentsPostId) {
      i.comment.push({
        "commentUsername": commentUsername,
        "commentText": commentText,
        "commentId": commentId
      })
      commentId++;
      renderPosts();
    }
  }
}

$('.posts').on('click', '.postComment', comment)

const removeComment = function () {
  const itemRemoved = $(this).closest(".comment").data().commentid;
  for (let i of posts) {
    for (let t in i.comment) {
      if (i.comment[t].commentId == itemRemoved) {
        i.comment.splice(t, 1)
      }
    }

  }
  renderPosts();
}

$('.posts').on('click', '.removeComment', removeComment); 

$('.posts').on('click', '.link', function () {
  const postToOpen = $(this).closest(".posted");
  postToOpen.dialog();
  renderPosts();
});