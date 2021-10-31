<template>
    <div>
        <form @submit.prevent="handleRegisterSubmit">
            <div>
                <label for="">Name</label>
                <br/>
                <input type="text" name="name" v-model="name" >
                <br/>
                <label for="">Email</label>
                <br/>
                <input type="email" name="email" v-model="email" >
                <br/>
                <label for="">Password</label>
                <br/>
                <input type="password" name="password" v-model="password" >
                <br/>
                <label for="">Confirm Password</label>
                <br/>
                <input type="password" name="password_confirmation" v-model="password_confirmation" >
                <br/>
                <input type="submit" value="Register">
            </div>
        </form>
        <button @click="clearRegisterForm">Clear</button>
        <br/>
        <router-link :to="{name: 'Login'}">Login</router-link>
        <ul>
            <li class="error" v-for="error in errors" :key="error">{{error}}</li>
        </ul>
    </div>
</template>
<script>
import axios from 'axios'
import router from './../../router/index'
import store from './../../store/index'
export default {
    data(){
        return{
            name :'',
            email :'',
            password :'',
            password_confirmation :'',
            errors : []
        }
    },
    setup(){
        // console.log('register component mounted!');
    },
    methods:{
        handleRegisterSubmit(){
            let data = {
                name:this.name,
                email:this.email,
                password:this.password,
                password_confirmation:this.password_confirmation
            }
            axios.post('api/register', data)
            .then((response)=>{
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
        },
        clearRegisterForm(){
            this.name = ''
            this.email = ''
            this.password = ''
            this.password_confirmation = ''

        }
    }
}
</script>

<style scoped>
    .error{
        color:red;
    }
</style>