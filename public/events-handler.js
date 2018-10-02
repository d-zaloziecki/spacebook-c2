class EventsHandler {
    constructor(postsRepository, postsRenderer) {
        this.postsRepository = postsRepository;
        this.postsRenderer = postsRenderer;
        this.$posts = $(".posts");
    }

    getPostsFromDB() {
        let promise = this.postsRepository.getPosts()
        promise.then(()=>{
            this.postsRenderer.renderPosts(this.postsRepository.posts);
        })
    }

    registerAddPost() {
        $('#addpost').on('click', () => {
            let $input = $("#postText");
            if ($input.val() === "") {
                alert("Please enter text!"); 
            } else {
                let promise = this.postsRepository.addPost($input.val());
                promise.then(()=>{
                    this.postsRenderer.renderPosts(this.postsRepository.posts);
                    $input.val("");
                })
            }
        });        
    }

    registerRemovePost() {
        this.$posts.on('click', '.remove-post', (event) => {
            let id = $(event.currentTarget).closest('.post').data().id;
            let promise = this.postsRepository.removePost(id);
            promise.then(()=>{
                this.postsRenderer.renderPosts(this.postsRepository.posts);
            })
          });

    }

    registerToggleComments() {
        this.$posts.on('click', '.toggle-comments', (event) => {
            let $clickedPost = $(event.currentTarget).closest('.post');
            $clickedPost.find('.comments-container').toggleClass('show');
          });
    }

    registerAddComment() {
        this.$posts.on('click', '.add-comment', (event) => {
            let $comment = $(event.currentTarget).siblings('.comment');
            let $user = $(event.currentTarget).siblings('.name');
          
            if ($comment.val() === "" || $user.val() === "") {
              alert("Please enter your name and a comment!");
              return;
            }
          
            let postId = $(event.currentTarget).closest('.post').data().id;
            let newComment = { commentText: $comment.val(), writerName: $user.val() };
            
            let promise = this.postsRepository.addComment(newComment, postId);
            promise.then(()=>{
                this.postsRenderer.renderPosts(this.postsRepository.posts);
                $comment.val("");
                $user.val("");
            })
            
          });

    }

    registerRemoveComment() {
        this.$posts.on('click', '.remove-comment', (event) => {
            let $commentsList = $(event.currentTarget).closest('.post').find('.comments-list');
            let postId = $(event.currentTarget).closest('.post').data().id;
            let commentId = $(event.currentTarget).closest('.comment').data().id;
            this.postsRepository.deleteComment(postId, commentId).then(()=>{
                this.postsRenderer.renderPosts(this.postsRepository.posts);
            })
        });
    }
}

export default EventsHandler