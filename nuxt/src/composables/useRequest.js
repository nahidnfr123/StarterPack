import accessToken from "~/composables/useToken";

const $api = {
  async get(url) {
    const config = useRuntimeConfig()
    // const savedToken = useCookie('token')
    const {data, pending, error, refresh} = await useFetch(url, {
      baseURL: config.public.apiBaseUrl,
      onRequest({request, options}) {
        // Set the request headers
        options.headers = options.headers || {}
        if (accessToken()) options.headers.Authorization = `Bearer ${accessToken()}`
        options.headers.accept = 'application/json'
      },
      onRequestError({request, options, error}) {
        // Handle the request errors
      },
      onResponse({request, response, options}) {
        // Process the response data
        // if (response.status === 200) dispatchSuccess('Success')
        return response._data
      },
      onResponseError({request, response, options}) {
        // console.log(response)
        // Handle the response errors
        // dispatchError(response)
      }
    })
    return {data, pending, refresh, error}
  },
  async post(url, payload) {
    const config = useRuntimeConfig()
    const {data, pending, error, refresh} = await useFetch(url, {
      baseURL: config.public.apiBaseUrl,
      onRequest({request, options}) {
        // Set the request headers
        options.body = payload
        options.method = 'POST'
        options.headers = options.headers || {}
        if (accessToken()) options.headers.Authorization = `Bearer ${accessToken()}`
        options.headers.contentType = 'multipart/form-data'
        options.headers.accept = 'application/json'
      },
      onRequestError({request, options, error}) {

        // Handle the request errors
      },
      onResponse({request, response, options}) {
        // Process the response data
        if (response.status === 200) dispatchSuccess('Success')
        return response._data
      },
      onResponseError({request, response, options}) {
        // console.log(response)
        // Handle the response errors
        dispatchError(response)
      }
    })
    return {data, pending, error, refresh}
  },
}

const dispatchSuccess = (message) => {
  const {$awn} = useNuxtApp()
  $awn.success(message)
}

const dispatchError = (err) => {
  let error = err._data
  let message = ''

  if (error.status === 401 || error.status === 403 || error.status === 422 || error.status === 500)
    message = error.statusText + '! ' + error.data.message
  else if (error.status === 419)
    message = 'CORES Error! ' + error.data.message
  else message = 'Some Error Occurred!'

  const {$awn} = useNuxtApp()
  $awn.alert(message)
}


export default $api
