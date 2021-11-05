<template>
    <div class="post-card" v-for="post in posts" :key="post.id">
        <h3>{{post.title}}</h3>
        <h6>{{post.content}}</h6>
    </div>
</template>
<script>
export default {
    setup(){
        console.log();
    },
    props:{
        posts: Array
    }
}
</script>
<style scoped>
    .post-card{
        border:1px solid brown;
    }
</style>