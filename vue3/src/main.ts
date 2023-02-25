import {createApp} from 'vue'
import {createPinia} from 'pinia'
import {plugin, defaultConfig} from '@formkit/vue'
import './style.css'
import './assets/main.css'
import formKitConfig from './config/formkit.config.js'
import __api from './plugins/api.js'

import {Icon} from '@iconify/vue';


import App from './App.vue'
import router from './router'

// *** Layouts ...
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";


const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(plugin, defaultConfig(formKitConfig)) /// Form Kit ...
app.component("Icon", Icon); // Icon ...

// Layouts ...
app.component("default-layout", DefaultLayout);
app.component("auth-layout", AuthLayout);
app.use(__api, {

})

// app.config.globalProperties.$api = $api

app.mount('#app')
