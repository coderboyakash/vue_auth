import { createStore } from 'vuex'

const store = createStore({
    state () {
      return {
        loggedInUser: null,
        isLoggedIn: false
      }
    },
    mutations: {
      setLoggedInUser (state, payload) {
        if(payload != null){
          state.loggedInUser = {
            'id':payload.id,
            'name':payload.name,
            'email':payload.email,
          }
        }else{
          state.loggedInUser = null
        }
      },
      setIsLoggedIn (state, payload) {
        state.isLoggedIn = payload
      },
    },
    getters:{
        getIsLoggedIn (state) {
            return state.isLoggedIn;
        },
        getLoggedInUser (state) {
            return state.loggedInUser;
        },
    }
})

export default store