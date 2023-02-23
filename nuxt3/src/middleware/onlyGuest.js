import {useAuthStore} from "~/stores/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  // if (process.server) return
  const authStore = useAuthStore()
  // const $next = to.query.next //
  // if ($next) return navigateTo({path: $next})
  if (authStore.isLoggedIn) return abortNavigation() //Abort page navigation 404
})
