<template>
    <h1>Home</h1>
    <button @click="handleLogout">Logout</button>
    <hr>
    <router-link :to="{name:'ProfilePage'}">User Profile</router-link>
    <br>
    <router-link :to="{name:'UserPosts'}">User Posts</router-link>

    <ul>
        <li v-for="router in this.$router.options.routes" :key="router">
            {{router.name}}
            <ul>
                <li v-for="children in router.children" :key="children">{{children.name}}</li>
            </ul>
        </li>
    </ul>
</template>
<script>
import router from './../router/index'
import store from './../store/index'
export default {
    setup(){
        console.log(router.options);
        console.log(store.getters.getPosts[0].id);
        console.log(store.getters.getPosts[0].title);
    },
    data(){
        return{
            loggedInUser : store.getters.getLoggedInUser
        }
    },
    methods:{
        handleLogout(){
            console.log('wow');
            localStorage.setItem('_token', '')
            store.commit('setIsLoggedIn', false)
            store.commit('setLoggedInUser', null)
            router.push({ name: "Login" })
        }
    }
}
</script>