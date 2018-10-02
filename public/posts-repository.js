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
      return $.post('/posts', {postText: postText}).then((data)=>{
            this.posts = data;
        })
    }

    removePost(id) {
        return $.ajax({
            url: '/posts/' + id,
            method: 'DELETE',
            contentType: 'application/json',
            success: (data)=> {
                this.posts=data;
            },
            error: (request,msg,error)=> {
                console.log(error)
            }
        }); 
        
        
        // $.post('/deletePost', {id: id}).then((data)=>{this.posts=data})
    }
    
    addComment(newComment, postId) {
        return $.post('/comments', {commentText: newComment.commentText, writerName: newComment.writerName, postId: postId}).then((data)=>{
            this.posts = data;
        })
    };

    deleteComment(postId, commentId) {
        return $.ajax({
            url: '/comments/' + postId + "/" + commentId,
            method: 'DELETE',
            contentType: 'application/json',
            success: (data)=> {
                this.posts=data;
            },
            error: (request,msg,error)=> {
                console.log(error)
            }
        }); 
        
        // $.post('/comments/', {commentId: commentId, postId: postId}).then((data)=>{this.posts=data})
    };
}

export default PostsRepository