import { createApp } from 'vue'
import router from './router/index'
import store from './store/index'

const app = createApp({});
app.use(router)
app.use(store)
app.mount('#app');
