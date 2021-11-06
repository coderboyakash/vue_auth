import axios from 'axios'
import { getMyPosts, getNewPost } from './../apis'
const PostsStore = {
    state() {
        return{
            post: null,
            posts: []
        }
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
    },
    actions:{
        createPost(context, payload){
            let headers = {
                Authorization: context.getters.getToken
            }
            axios.post(getNewPost,payload, {headers})
            .then(()=>{
                console.log('post ceatedd');
                context.dispatch('loadPosts')

            })
        },
        loadPosts(context){
            console.log('loadPosts called');
            let headers = {
                Authorization: context.getters.getToken
            }
            axios.get(getMyPosts, {headers})
            .then((response)=>{
                context.commit('setPosts', response.data.result)
            })
        }
    }
}

export default PostsStore;