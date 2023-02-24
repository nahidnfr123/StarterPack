import {createApp} from 'vue'
import {createPinia} from 'pinia'
import {plugin, defaultConfig} from '@formkit/vue'
import './style.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(plugin, defaultConfig)
app.mount('#app')
