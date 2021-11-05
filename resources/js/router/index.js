import { createRouter, createWebHistory } from 'vue-router'
import Home from './../pages/Home.vue'
import User from './../pages/User.vue'
import About from './../pages/About.vue'
import Login from './../pages/auth/Login.vue'
import UserProfile from '../pages/UserProfile.vue'
import Register from './../pages/auth/Register.vue'
import Posts from './../pages/Posts.vue'
import store from '../store/index'
import axios from 'axios'
import { getUser } from './../apis'
const routes = [
    { 
        path: '/', 
        component: Home,
        name: 'Home',
        meta: { requiresAuth: true },
    },
    { 
        path: '/user', 
        component: User,
        meta: { requiresAuth: true },
        children: [
            {
              path: 'profile',
              component: UserProfile,
              name: 'ProfilePage',
              meta: { requiresAuth: true } 
            },
            {
                path: 'posts',
                component: Posts,
                name: 'UserPosts',
                meta: { requiresAuth: true } 
            }
        ]
    },
    { 
        path: '/login', 
        component: Login,
        name: 'Login',
        meta: { requiresAuth: false } 
    },
    { 
        path: '/register', 
        component: Register,
        name: 'Register',
        meta: { requiresAuth: false } 
    },
    { 
        path: '/about', 
        component: About,
        name: 'About',
        meta: { requiresAuth: true } 
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})
router.beforeEach((to, from, next) => {
    if(to.path == '/login' || to.path == '/register'){
        check().then(()=>{
            if(store.getters.getIsLoggedIn){
                router.push('/')
            }else if(!to.meta.requiresAuth && !store.getters.getIsLoggedIn){
                next()
            }
        })
        
    }else{
        check().then(()=>{
            if(to.meta.requiresAuth && store.getters.getIsLoggedIn){
                next()
            }else{
                router.push('/login')
            }
        })
    }
})

const check = async () => {
    let _token = localStorage.getItem("_token");
    if((_token)){
        let headers = {
            Authorization: 'Bearer ' + _token
        }
        await axios.get(`${getUser}`,{headers})
        .then((response)=>{
            if(response.data.isSuccess == true){
                let result = response.data.result
                store.commit('setIsLoggedIn', true)
                store.commit('setLoggedInUser', result)
                return true;
            }else{
                store.commit('setIsLoggedIn', false)
                return false;
            }
        })
    }
}

export default router;