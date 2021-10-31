<template>
    <h1>Home</h1>
    <button @click="handleLogout">Logout</button>
    <router-link :to="{name:'ProfilePage'}">UserProfile</router-link>
</template>
<script>
import router from './../router/index'
import store from './../store/index'
export default {
    setup(){
        // console.log(store.getters.getLoggedInUser);
    },
    data(){
        return{
            loggedInUser : store.getters.getLoggedInUser
        }
    },
    methods:{
        handleLogout(){
            localStorage.setItem('_token', '')
            store.commit('setIsLoggedIn', false)
            store.commit('setLoggedInUser', null)
            router.push({ name: "Login" })
        }
    }
}
</script>