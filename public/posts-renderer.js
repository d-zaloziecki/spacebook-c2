    /**
     * @class Responsible for rendering posts and comments in the HTML
     */
class PostsRenderer {
    constructor() {
        this.$posts = $(".posts");
        this.$postTemplate = $('#post-template').html();
        // this.$commentTemplate = $('#comment-template').html();
    }

    renderPosts(posts) {
        this.$posts.empty();
        let template = Handlebars.compile(this.$postTemplate);
       
        let newHTML = template({posts});
        this.$posts.append(newHTML);        
    }
}

export default PostsRenderer