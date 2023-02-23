import {useAuthStore} from "~/stores/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  // if (process.server) return
  const authStore = useAuthStore()
  if (authStore.isLoggedIn) {
    const $next = to.query.next //
    if ($next) return navigateTo({path: $next})
    return abortNavigation() //Abort page navigation 404
  }
})
