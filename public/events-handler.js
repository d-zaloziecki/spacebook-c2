class EventsHandler {
    constructor(postsRepository, postsRenderer) {
        this.postsRepository = postsRepository;
        this.postsRenderer = postsRenderer;
        this.$posts = $(".posts");
    }

    async getPostsFromDB() {
        await this.postsRepository.getPosts();
        this.postsRenderer.renderPosts(this.postsRepository.posts);
    }

    registerAddPost() {
        $('#addpost').on('click', async () => {
            let $input = $("#postText");
            if ($input.val() === "") {
                alert("Please enter text!");
                return;
            }

            await this.postsRepository.addPost($input.val());
            this.postsRenderer.renderPosts(this.postsRepository.posts);
            $input.val("");
        });
    }

    registerRemovePost() {
        this.$posts.on('click', '.remove-post', async (event) => {
            let id = $(event.currentTarget).closest('.post').data().id;

            await this.postsRepository.removePost(id)
            this.postsRenderer.renderPosts(this.postsRepository.posts);
        });
    }

    registerToggleComments() {
        this.$posts.on('click', '.toggle-comments', (event) => {
            let $clickedPost = $(event.currentTarget).closest('.post');
            $clickedPost.find('.comments-container').toggleClass('show');
        });
    }

    registerAddComment() {
        this.$posts.on('click', '.add-comment', async (event) => {
            let $comment = $(event.currentTarget).siblings('.comment');
            let $user = $(event.currentTarget).siblings('.name');

            if ($comment.val() === "" || $user.val() === "") {
                alert("Please enter your name and a comment!");
                return;
            }

            let postId = $(event.currentTarget).closest('.post').data().id;
            let newComment = { commentText: $comment.val(), writerName: $user.val() };

            await this.postsRepository.addComment(newComment, postId);
            this.postsRenderer.renderPosts(this.postsRepository.posts);
            $comment.val("");
            $user.val("");
        });
    }

    registerRemoveComment() {
        this.$posts.on('click', '.remove-comment', async (event) => {
            let postId = $(event.currentTarget).closest('.post').data().id;
            let commentId = $(event.currentTarget).closest('.comment').data().id;

            await this.postsRepository.deleteComment(postId, commentId)
            this.postsRenderer.renderPosts(this.postsRepository.posts);
        });
    }

    registerSaveUpdateComment() {
        this.$posts.on('click', '.save-update-comment', async (event) => {
            let commentId = $(event.currentTarget).closest('.comment').data().id;
            let commentText = $(event.currentTarget).closest('.comment').val();

            await this.postsRepository.updateComment(commentId, commentText);
            this.postsRenderer.renderPosts(this.postsRepository.posts);
        })
    }

    registerUpdateComment() {
        this.$posts.on('click', '.update-comment', async (event) => {
            let comment = $(event.currentTarget).closest('.comment')

        })
    }
}

export default EventsHandler