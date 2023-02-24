import accessToken from "@/composables/useToken";
import config from "@/config/appConfig";


const $api = {
  async get(url, __ = {showSuccess: false, showError: false, successMessage: 'Success', errorMessage: ''}) { /// Performs GET request ...
    let data, error = null

    await fetch(url, {
      baseURL: config.apiBaseUrl, // Set the api base url from .env ...
      headers: {
        'authorization': `Bearer ${accessToken()}`,
        'accept': 'application/json',
      },
    }).then((response) => response.json())
        .then(response => {
          if (response.status === 200 && __.showSuccess) dispatchSuccess(__.successMessage || 'Success!') // Success Message ...
          return data = response.data
        }).catch(err => {
          if (__.showError) dispatchError(err, __.errorMessage)
          error = err
        })

    return {data, error}
  },
  async post(url, payload, __ = {showSuccess: true, showError: true, successMessage: 'Success', errorMessage: ''}) { /// Performs POST and PUT request ...
    let data, error = null

    await fetch(url, {
      baseURL: config.apiBaseUrl, // Set the api base url from .env ...
      body: payload,
      method: 'POST',
      headers: {
        'authorization': `Bearer ${accessToken()}`,
        'content-type': 'multipart/form-data',
        'accept': 'application/json',
      },
    }).then((response) => response.json())
        .then(response => {
          if (response.status === 200 && __.showSuccess) dispatchSuccess(__.successMessage || 'Success!') // Success Message ...
          return data = response.data
        }).catch(err => {
          if (__.showError) dispatchError(err, __.errorMessage)
          error = err
        })

    return {data, error}
  },
}

const dispatchSuccess = (message) => {
  if (import.meta.server) return //
  // const {$awn} = useNuxtApp()
  // $awn.success(message) // Toast ...
}

const dispatchError = (err, errorMessage) => {
  if (import.meta.server) return
  let error = err._data
  let message = ''

  if ([401, 403, 422, 500].includes(err.status)) {
    message = err?.statusText + '! ' + error?.message
  } else if (err.status === 419) {
    message = 'CORES Error! ' + error?.message
  } else {
    message = errorMessage || 'Some Error Occurred!'
  }

  // const {$awn} = useNuxtApp()
  // $awn.alert(message) /// Toast ...
}


export default $api
