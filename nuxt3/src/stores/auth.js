import {defineStore} from "pinia";
import $api from "~/composables/useRequest";
import {getUser, setToken, getToken} from "~/composables/useAuth";
import {useAuthState} from "~/composables/states";


export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    token: getToken() || null,
    user: process.client ? (getUser() || null) : null
  }),
  getters: {},
  actions: {
    async register(payload) {
      const {data, pending, error, refresh} = await $api.post('register', payload);
      this.user = data?.value?.user
      this.token = data?.value?.token
      this.isLoggedIn = this.token && this.user && this.user.id
      setToken(this.token, this.user)
      return {data: data?.value, pending, error, refresh}
    },
    async login(payload) {
      const {data, pending, error, refresh} = await $api.post('login', payload);
      this.token = data?.value?.token || null
      this.user = data?.value?.user || null
      this.isLoggedIn = this.token && this.user && this.user.id
      setToken(this.token, this.user)
      return {data: data?.value, pending, error, refresh}
    },
    async getUser() {
      const {data, pending, error, refresh} = await $api.get('user')
      if (error?.value && error?.value?.status == 403) {
      } else {
        this.user = data?.value || {}
        this.isLoggedIn = this.token && this.user && this.user.id
        setToken(this.token, this.user)
      }
      // return {data: toRaw(data?.value), pending, error, refresh}
      return {data: data?.value, pending, error, refresh}
    },
    logout() {
      this.token = '';
      this.user = '';
      this.isLoggedIn = false
      removeToken()
    },
  }
})
