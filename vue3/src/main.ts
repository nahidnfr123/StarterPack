import {createApp} from 'vue'
import {createPinia} from 'pinia'
import {plugin, defaultConfig} from '@formkit/vue'
import './style.css'
import './assets/main.css'
import formKitConfig from './config/formkit.config.js'

import { Icon } from '@iconify/vue';

import App from './App.vue'
import router from './router'

// *** Layouts ...
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";


const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(plugin, defaultConfig(formKitConfig))
app.component("Icon", Icon);
app.component("default-layout", DefaultLayout);
app.component("auth-layout", AuthLayout);
app.mount('#app')
