<template>
    <div>
        <form @submit.prevent="handleLogin">
            <label>Email</label>
            <input class="form-input" type="text" v-model="email" placeholder="email">
            <br/>
            <label>Password</label>
            <input class="form-input" type="password" v-model="password" placeholder="*********">
            <br/>
            <input type="submit" value="Submit">
        </form>
        <router-link :to="{name: 'Register'}">Register</router-link>
        <ul>
            <li v-for="error in errors" :key="error">{{error}}</li>
        </ul>
    </div>
</template>
<script>
import axios from 'axios'
import router from './../../router/index'
import store from './../../store/index'
export default {
    setup(){
        // console.log(login);
    },
    data(){
        return{
            email : '',
            password : '',
            errors : []
        }
    },
    methods:{
        handleLogin(){
            let data = {
                email:this.email,
                password:this.password
            }
            axios.post('api/login', data)
            .then((response)=>{
                // console.log(response);
                if(response.data.isSuccess == false){
                    if(response.data.code == 422){
                        let errors = []
                        Object.values(response.data.errors).forEach(messages => {
                            errors.push(...messages)
                        })
                        this.errors = errors
                        setTimeout(() => {
                            this.errors = []
                        }, 3000);
                    }
                }else{
                    let result = response.data.result
                    store.commit('setIsLoggedIn', response.data.isSuccess)
                    store.commit('setLoggedInUser', result)
                    localStorage.setItem("_token",response.data._token);
                    router.push({ name: "Home" })
                }
            })
        }
    }
}
</script>

<style>
    .form-input{
        margin: 10px;
        padding: 10px;
        border-radius: 10px;
    }
</style>