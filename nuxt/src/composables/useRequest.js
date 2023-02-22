import accessToken from "~/composables/useToken";

const $api = {
  async get(url) { /// Performs GET request ...
    const config = useRuntimeConfig()
    const {data, pending, error, refresh} = await useFetch(url, {
      baseURL: config.public.apiBaseUrl, // Set the api base url from .env ...
      onRequest({request, options}) {
        // Set the request headers
        options.headers = options.headers || {}
        if (accessToken()) options.headers.Authorization = `Bearer ${accessToken()}` // Set the authorization token ...
        options.headers.accept = 'application/json' // header accept application/json is required ... Otherwise backend throws 302 status ...
      },
      onRequestError({request, options, error}) {
        // Handle the request errors
      },
      onResponse({request, response, options}) {
        // Process the response data
        if (response.status === 200) dispatchSuccess('Success') // Success Message ...
        return response._data
      },
      onResponseError({request, response, options}) {
        // Handle the response errors
        dispatchError(response) // Show Error Toast ...
      }
    })
    return {data, pending, refresh, error}
  },
  async post(url, payload) { /// Performs POST and PUT request ...
    const config = useRuntimeConfig()
    const {data, pending, error, refresh} = await useFetch(url, {
      baseURL: config.public.apiBaseUrl, // Set the api base url from .env ...
      onRequest({request, options}) {
        // Set the request headers
        options.body = payload
        options.method = 'POST'
        options.headers = options.headers || {}
        if (accessToken()) options.headers.Authorization = `Bearer ${accessToken()}` // Set the authorization token ...
        options.headers.contentType = 'multipart/form-data' // Required for uploading images ...
        options.headers.accept = 'application/json' // header accept application/json is required ... Otherwise backend throws 302 status ...
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
  if (process.server) return //
  const {$awn} = useNuxtApp()
  $awn.success(message) // Toast ...
}

const dispatchError = (err) => {
  if (process.server) return
  let error = err._data
  let message = ''

  if (error.status === 401 || error.status === 403 || error.status === 422 || error.status === 500)
    message = error.statusText + '! ' + error.data.message
  else if (error.status === 419)
    message = 'CORES Error! ' + error.data.message
  else message = 'Some Error Occurred!'

  const {$awn} = useNuxtApp()
  $awn.alert(message) /// Toast ...
}


export default $api
