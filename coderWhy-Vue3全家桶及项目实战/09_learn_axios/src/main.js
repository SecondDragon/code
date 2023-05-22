import { createApp } from 'vue'
import axios from 'axios'
import App from './App.vue'
import hyRequest from './service'

createApp(App).mount('#app')

hyRequest.request({
  url: "/lyric?id=500665346"
}).then(res => {
  console.log("res:", res)
})

hyRequest.get({
  url: "/lyric",
  params: {
    id: 500665346
  }
}).then(res => {
  console.log("res:", res)
})
