import {defineStore} from "pinia";
import $api from "~/composables/useRequest";
import accessToken from "~/composables/useToken";

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: !!accessToken(), // If token present loggedIn true ... Else Middleware doesnt work on page reload
    token: accessToken() || null, // Get Token Form Cookie or set it to null
    user: null
  }),
  getters: {
    isAuthenticated: (state) => {
      return !!(state.token && (state.user && state.user.id))
    },
  },
  actions: {
    async register(payload) {
      const options = {showSuccess: true, showError: true, successMessage: 'Registered Successfully!'}
      const {data, pending, error, refresh} = await $api.post('register', payload, options) // Register Request to api ...
      this.setTokenUser(data?.value?.token, data?.value?.user) // Set the User and the Token ,...
      return {data, pending, error, refresh}
    },
    async login(payload) {
      const options = {showSuccess: true, showError: true, successMessage: 'Logged In Successfully!'}
      const {data, pending, error, refresh} = await $api.post('login', payload, options) // login Request to api ...
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
      if (!accessToken()) return {}
      const {data, pending, refresh, error} = await $api.get('user') // Get the user data form api ...
      if (error?.value) {
        this.clearAuth() // Clear Auth Data if there is error fetching User data
      } else {
        this.user = data?.value || null // set the user data to store ...
        this.isLoggedIn = !!(this.token && this.user && this.user.id) // set the isLoggedIn State to true if user and token is available ...
      }
      return {data: data?.value, pending, error: error?.value, refresh}
    },
    async logout() {
      const options = {showSuccess: true, showError: false, successMessage: 'Logout Successful!', errorMessage: 'Error logging out!'}
      await $api.post('logout', {}, options)
      this.clearAuth()

      const router = useRouter()
      router.push('/')
    },
    clearAuth() {
      this.token = null
      this.user = null
      this.isLoggedIn = false

      if (process.server) return
      accessToken('') // Clearing the Cookie ...
    }
  }
})
