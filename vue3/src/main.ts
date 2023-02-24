import {createApp} from 'vue'
import {createPinia} from 'pinia'
import {plugin, defaultConfig} from '@formkit/vue'
import './style.css'
import './assets/main.css'

import {OhVueIcon, addIcons} from "oh-vue-icons";
// import { FaFlag, RiZhihuFill } from "oh-vue-icons/icons";
// addIcons(FaFlag, RiZhihuFill);

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(plugin, defaultConfig)
app.component("Icon", OhVueIcon);
app.mount('#app')
