import {getToken} from "~/composables/useAuth";

const baseUrl = 'http://127.0.0.1:8000/api/'

const $api = {
  async get(url, pick) {
    // console.log('--- ' + getToken())
    const {data, pending, error, refresh} = await useFetch(url, {
      baseURL: baseUrl,
      // ...pick,
      onRequest({request, options}) {
        // Set the request headers
        options.baseUrl = this.baseUrl
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
    const fullUrl = baseUrl + url
    const {data, pending, error, refresh} = await useFetch(fullUrl, {
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
