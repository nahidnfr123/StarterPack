import {defineStore} from "pinia";
import $api from "~/composables/useRequest";
import {getUser, setToken, getToken} from "~/composables/useAuth";
import {useAuthState} from "~/composables/states";


export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: !!(getToken() && getUser()),
    token: getToken() || null,
    user: getUser() || null
  }),
  getters: {},
  actions: {
    async register(payload) {
      const {data, pending, error, refresh} = await $api.post('register', payload);
      const value = data?.value || {}
      this.setTokenUser(value?.token, value?.user)
      return {data, pending, error, refresh}
    },
    async login(payload) {
      const {data, pending, error, refresh} = await $api.post('login', payload);
      const value = data?.value || {}
      this.setTokenUser(value?.token, value?.user)
      return {data, pending, error, refresh}
    },
    setTokenUser(token = null, user = {}) {
      this.token = token
      this.user = user
      this.isLoggedIn = token && user && user.id
      setToken(token || '', user)
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
      return {data: data?.value, pending, error: error?.value, refresh}
    },
    logout() {
      this.token = '';
      this.user = '';
      this.isLoggedIn = false
      removeToken()
    },
  }
})
