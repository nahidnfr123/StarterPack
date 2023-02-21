import {getToken} from "~/composables/useAuth";

const $api = {
  async get(url) {
    const config = useRuntimeConfig()
    const {data, pending, error, refresh} = await useFetch(url, {
      baseURL: config.public.apiBaseUrl,
      onRequest({request, options}) {
        // Set the request headers
        options.headers = options.headers || {}
        if (getToken()) options.headers.Authorization = `Bearer ${getToken()}`
      },
      onRequestError({request, options, error}) {
        // Handle the request errors
      },
      onResponse({request, response, options}) {
        // Process the response data
        return response._data
      },
      onResponseError({request, response, options}) {
        // console.log(response)
        // Handle the response errors
      }
    })
    return {data, pending, error, refresh}
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
        if (getToken()) options.headers.Authorization = `Bearer ${getToken()}`
        options.headers.contentType = 'multipart/form-data'
        options.headers.accept = 'application/json'
      },
      onRequestError({request, options, error}) {
        // Handle the request errors
      },
      onResponse({request, response, options}) {
        // Process the response data
        return response._data
      },
      onResponseError({request, response, options}) {
        // console.log(response)
        // Handle the response errors
      }
    })
    return {data, pending, error, refresh}
  }
}

export default $api
