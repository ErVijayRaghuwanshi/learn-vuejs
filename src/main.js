import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router' // Points to src/router/index.js
import App from './App.vue'
import './style.css'

const app = createApp(App)

app.use(createPinia())
app.use(router) // Ensure this is present!
app.mount('#app')