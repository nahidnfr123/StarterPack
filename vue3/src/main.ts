import {createApp} from 'vue'
import {createPinia} from 'pinia'
import {plugin, defaultConfig} from '@formkit/vue'
import './style.css'
import './assets/main.css'
import formKitConfig from './config/formkit.config'

import {Icon} from '@iconify/vue';


import App from './App.vue'
import router from './router'

// *** Layouts ...
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";
import NotificationList from "@/components/notification/NotificationList.vue";
import NotificationListItem from "@/components/notification/NotificationListItem.vue";

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(plugin, defaultConfig(formKitConfig)) /// Form Kit ...
app.component("Icon", Icon); // Icon ...

// Layouts ...
app.component("default-layout", DefaultLayout);
app.component("auth-layout", AuthLayout);
app.component('notification-list', NotificationList)
app.component('notification-list-item', NotificationListItem)
app.mount('#app')
