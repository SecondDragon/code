import { createApp } from 'vue'
import router from './router'
import App from './App.vue'

// localStorage.setItem("token", "coderwhy")

const app = createApp(App)
app.use(router)
app.mount('#app')
