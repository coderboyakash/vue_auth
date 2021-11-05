import { createStore } from 'vuex'
import PostsStore from './posts'
import UserStore from './user'

const store = createStore({
    modules:{
      user: UserStore,
      posts: PostsStore,
    }
})

export default store