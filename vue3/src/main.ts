import {createApp} from 'vue'
import {createPinia} from 'pinia'
import {plugin, defaultConfig} from '@formkit/vue'
import './style.css'
import './assets/main.css'

// import AWN from 'awesome-notifications'


// Your custom options
const options = {
  position: 'bottom-right',
  maxNotifications: 5,
  durations: {
    global: 3000,
  },
  icons: {
    enabled: false,
    alert: 'alert',
    prefix: "<Icon size='26' class='mr-2' name='mdi-light:",
    suffix: "'></Icon>"
  }
}


import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
// app.use(AWN, options)
app.use(plugin, defaultConfig)
app.mount('#app')
