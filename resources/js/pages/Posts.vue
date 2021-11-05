<template>
    <div>
        <router-link :to='{name:"Home"}'>Home</router-link>
        <CreatePost @updatePostsData="updatePostsData" />
        <hr>
        <h1 v-if="isLoading">Loading Posts....</h1>
        <PostCard v-else :posts="posts" />
    </div>
</template>
<script>
import axios from 'axios'
import { getMyPosts } from './../apis'
import store from './../store/index'
import PostCard from './PostCard.vue'
import CreatePost from './CreatePost.vue'
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters(['getPosts'])
    },
    setup(){
        console.log(store.getters.getPosts);
    },
    components:{
        PostCard,CreatePost
    },
    data(){
        return{
            posts: this.getPosts,
            isLoading: false
        }
    },
    methods:{
        fetchPosts(){
            let headers = {
                Authorization: store.getters.getToken
            }
            axios.get(getMyPosts, {headers})
            .then((response)=>{
                setTimeout(() => {
                    store.commit('setPosts', response.data.result)
                    // this.posts = response.data.result
                    this.isLoading = false
                }, 2000);
            })
        },
        updatePostsData(){
            this.fetchPosts()
        }
    },
    mounted(){
        this.fetchPosts()
    },
    watch: {
        getPosts() {
            this.posts = store.getters.getPosts
        }
    }
}
</script>