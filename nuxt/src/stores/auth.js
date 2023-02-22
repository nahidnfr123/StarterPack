import {defineStore} from "pinia";
import $api from "~/composables/useRequest";
import accessToken from "~/composables/useToken";

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    token: accessToken() || null, // Get Token Form Cookie or set it to null
    user: null
  }),
  getters: {},
  actions: {
    async register(payload) {
      const {data, pending, error, refresh} = await $api.post('register', payload) // Register Request to api ...
      this.setTokenUser(data?.value?.token, data?.value?.user) // Set the User and the Token ,...
      return {data, pending, error, refresh}
    },
    async login(payload) {
      const {data, pending, error, refresh} = await $api.post('login', payload) // login Request to api ...
      this.setTokenUser(data?.value?.token, data?.value?.user) // Set the User and the Token ,...
      return {data, pending, error, refresh}
    },
    setTokenUser(token = null, user = {}) {
      this.token = token // set token in store ...
      this.user = user // set the user data to store ...
      this.isLoggedIn = !!(token && user && user.id) // set the isLoggedIn State to true if user and token is available ...

      accessToken(token) // Set The Token ...
    },
    async getUser() {
      const {data, pending, refresh, error} = await $api.get('user') // Get the user data form api ...
      if (error?.value && error?.value?.status == 403) {
        // If Un authenticated ... which means token not matching ... do nothing ...
      } else {
        this.user = data?.value || {} // set the user data to store ...
        this.isLoggedIn = !!(this.token && this.user && this.user.id) // set the isLoggedIn State to true if user and token is available ...
      }
      return {data: data?.value, pending, error: error?.value, refresh}
    },
    logout() {
      this.token = '';
      this.user = '';
      this.isLoggedIn = false

      accessToken('', true) // Clearing the Cookie ...
    },
  }
})
