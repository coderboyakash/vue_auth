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
import { mapActions } from 'vuex'
import store from './../store/index'
export default{
    computed:{
        // ...mapActions([
        //     'createPost'
        // ]),
    },
    data(){
        return{
            title:null,
            content:null,
        }
    },
    emits:["loadPosts"],
    methods:{
        ...mapActions([
            'createPost'
        ]),
        handleCreatePost(){
            let data = {
                title:this.title,
                content:this.content
            }
            console.log(data);
            this.createPost(data).then(()=>{
                this.$emit('loadPosts')            
            })
        }
    }
}
</script>