import {useAuthStore} from "~/stores/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()
  const {isAuthenticated} = authStore
  if (process.server && !authStore.token) { /// IN server only check for token ....
    return navigateTo('/auth/login?next=' + to.fullPath)
  } else if (process.client && !isAuthenticated) { // while in client check for both token and user data ...
    return navigateTo('/auth/login?next=' + to.fullPath)
  }
})
