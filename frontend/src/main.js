import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import './index.css'
import store from './store/index'
const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')
