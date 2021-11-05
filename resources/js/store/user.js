const UserStore = {
    state () {
        return {
          loggedInUser: null,
          isLoggedIn: false,
          _token:null
        }
      },
      mutations: {
        setLoggedInUser (state, payload) {
          if(payload != null){
            state.loggedInUser = {
              'id':payload.id,
              'name':payload.name,
              'email':payload.email,
              '_token':`Bearer ${localStorage.getItem("_token")}`,
            }
            state._token = `Bearer ${localStorage.getItem("_token")}`
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
          getToken (state) {
            return state._token;
          }
      }
}

export default UserStore