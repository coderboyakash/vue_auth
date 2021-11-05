const PostsStore = {
    state() {
        return{
            post: null,
            posts: [
                {id:1, title:'Akash', content: 'Content'},
                // {id:2, title:'Akash', content: 'Content'},
            ]
        }
    },
    mutations:{

    },
    getters:{
        getPosts(state){
            return state.posts
        }
    },
    mutations:{
        setPosts(state, payload){
            state.posts = payload
        }
    }
}

export default PostsStore;