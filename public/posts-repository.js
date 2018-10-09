    /**
     * @class Responsible for storing and manipulating Spacebook posts, in-memory
     */

class PostsRepository {
    constructor() {
        this.posts = [];
    }

    async getPosts() {
        return $.get('/posts').then((posts)=>{
         this.posts = posts
        })
    }

    async addPost(postText) {
        return $.post('/posts', {postText: postText}).then((data)=>{
            this.posts = data;
        })
    }

    async removePost(id) {
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
    }
    
    async addComment(newComment, postId) {
        return $.post('/comments', {commentText: newComment.commentText, writerName: newComment.writerName, postId: postId}).then((data)=>{
            this.posts = data;
        })
    };

    async deleteComment(postId, commentId) {
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
    };

    async updateComment(commentId, commentText){
        return $.ajax({
            url: '/comments/' + commentId + "/" + commentText,
            type: 'PUT',
            success: function(data) {
                this.posts=data;
            }
        });
    }
}

export default PostsRepository