    /**
     * @class Responsible for storing and manipulating Spacebook posts, in-memory
     */

class PostsRepository {
    constructor() {
        this.posts = [];
    }

    getPosts() {
        return $.get('/posts').then((posts)=>{this.posts = posts})
    }

    addPost(postText) {
      return $.post('/addPost', {postText: postText}).then((data)=>{
            this.posts = data;
        })
    }

    removePost(id) {
        return $.post('/deletePost', {id: id}).then((data)=>{this.posts=data})
    }
    
    addComment(newComment, postId) {
        return $.post('/addComment', {commentText: newComment.commentText, writerName: newComment.writerName, postId: postId}).then((data)=>{
            this.posts = data;
        })
    };

    deleteComment(postId, commentId) {
        return $.post('/deleteComment', {commentId: commentId, postId: postId}).then((data)=>{this.posts=data})
    };
}

export default PostsRepository