import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import './index.css'
// import store from './store'
import store from './store/newindex'
import { initializeAuthHeaderFromLocalStorage } from '../api/api';
initializeAuthHeaderFromLocalStorage();
const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')
