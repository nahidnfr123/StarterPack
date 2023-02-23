import {useAuthStore} from "~/stores/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  if (process.server) return
  const authStore = useAuthStore()
  const {isAuthenticated} = authStore
  // console.log(isAuthenticated)
  if (!isAuthenticated) return navigateTo('/auth/login?next=' + to.fullPath)
})
