<template>
    <div>
        <!-- <router-link :to='{name:"Home"}'>Home</router-link> -->
        <CreatePost @loadPost="loadPosts" />
        <hr>
        <button @click="reloadPosts">Load Posts</button>
        <h1 v-if="posts.length == 0">Loading Posts....</h1>
        <PostCard v-else :posts="posts" />
        <!-- {{ posts }} -->
    </div>
</template>
<script>
import PostCard from './PostCard.vue'
import CreatePost from './CreatePost.vue'
import { mapGetters, mapState, mapActions } from 'vuex'
import {onMounted} from 'vue'
export default {
    computed:{
        ...mapGetters({
            posts:'getPosts'
        }),
        ...mapActions({
            loadPosts:'loadPosts'
        })
    },
    mounted(){
        // this.loadPosts
    },
    components:{
        PostCard,CreatePost
    },
    data(){
        return{
            isLoading: false
        }
    },
    methods:{
        // ...mapActions([
        //     'loadPosts'
        // ]),
        reloadPosts(){
            this.$emit('loadPosts') 
        }
    }
}
</script>