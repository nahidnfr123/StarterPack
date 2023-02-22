export const redirectTo = (path) => {
  const route = useRoute()
  const router = useRouter()
  const $next = route.query.next
  let routePath = path
  if ($next) routePath = $next
  router.push({path: routePath})
}

export const throwFormError = (error, formNode) => {
  if (!error || !formNode) return
  if (error?.status === 422) formNode.setErrors(error?.data?.errors) // Validation Error ...
  else if (error?.status) formNode.setErrors('Server Error: ' + error?.data?.message || '') // General Error Message from Server.
  else formNode.setErrors('Error Connecting to Server! ' + error.name) // Error occurred, but server did not send any error status ... (Could Not Connect to server)
}
