import {useAuthStore} from "~/stores/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  // if (process.server) return
  const authStore = useAuthStore()
  const {isAuthenticated} = authStore
  // if (authStore.isLoggedIn) return abortNavigation() //Abort page navigation 404
  if (isAuthenticated) return navigateTo('/') // redirect to home page ...
})
