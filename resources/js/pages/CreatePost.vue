<template>
    <form @submit.prevent="handleCreatePost">
        <h2>Create Post</h2>
        <input type="text" v-model="title" placeholder="title" required>
        <br>
        <textarea v-model="content" id="" cols="30" rows="10" placeholder="content" required></textarea>
        <input type="submit" value="Create New Post">
    </form>
</template>
<script>
import axios from 'axios'
import { getNewPost } from './../apis'
import store from './../store/index'
export default{
    data(){
        return{
            title:null,
            content:null,
        }
    },
    props:{
        posts: Array
    },
    emits:["updatePostsData"],
    methods:{
        handleCreatePost(){
            let data = {
                title:this.title,
                content:this.content
            }
            let headers = {
                Authorization: store.getters.getToken
            }
            axios.post(getNewPost,data, {headers})
            .then((response)=>{
                this.title = null
                this.content = null
                this.$emit('updatePostsData')
            })
        }
    }
}
</script>