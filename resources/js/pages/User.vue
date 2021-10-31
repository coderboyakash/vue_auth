<template>
    <h3>id: {{ loggedInUser.id }}</h3>
    <h3>name: {{ loggedInUser.name }}</h3>
    <h3>email: {{ loggedInUser.email }}</h3>
    <router-view @handleLogout="handleLogout"></router-view>
</template>
<script>
import store from './../store/index'
import router from './../router/index'
export default {
    setup() {
        // console.log('user component loaded');
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