import axios from 'axios';
// axios.defaults.baseURL = process.env.API_URL || `http://127.0.0.1:8000/api/`
// axios.defaults.withCredentials = true
import Cookies from 'js-cookie'

function getTokenFromCookie() {
  const token = Cookies.get('token') || '--'
  console.log(token)
  return token
}

export const http = axios.create({
  baseURL: process.env.API_URL || `http://127.0.0.1:8000/api/`,
  headers: {
    'Content-type': 'multipart/form-data',
    // 'Content-type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json',
    'Authorization': `Bearer ${getTokenFromCookie()}`,
  },
  // withCredentials: true
})

const notifyPayload = {
  showSuccess: true,
  showError: true,
  successMessage: 'Success!',
  errorMessage: 'Some Error Occurred!'
}

const $api = {
  setAuthorization(token = getTokenFromCookie()) {
    http.defaults.headers = {
      'Content-type': 'multipart/form-data',
      // 'Content-type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Accept': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
    }
  },
  async get(url, notify = notifyPayload) {
    return await http.get(url).then((res) => {
      let data = null
      if (res?.data?.data) data = res?.data?.data
      else if (res?.data) data = res?.data
      else data = res

      if (notify.showSuccess) this.dispatchSuccess(notify.successMessage)
      return {message: 'success', data: data}
    }).catch((err) => {
      if (!err) return
      if (notify.showError) this.dispatchError(err)
      return {message: 'error', data: err?.response?.data}
    })
  },
  async post(url, data, notify = notifyPayload) {
    console.log(http.defaults.headers)
    // const session = getSession()
    // console.log(session?.user)
    return await http.post(url, data, {
      headers: {
        'Authorization': Cookies.get('token')
      }
    }).then((res) => {
      let data = null
      if (res?.data?.data) data = res?.data?.data
      else if (res?.data) data = res?.data
      else data = res

      if (notify.showSuccess) this.dispatchSuccess(notify.successMessage)
      return {message: 'success', data: data}
    }).catch((err) => {
      if (!err) return

      if (notify.showError) this.dispatchError(err)
      return {message: 'error', data: err?.response?.data}
    })
  },
  async delete(url, notify = notifyPayload) {
    return await http.delete(url).then((res) => {
      let data = null
      if (res?.data?.data) data = res?.data?.data
      else if (res?.data) data = res?.data
      else data = res

      if (notify.showSuccess) this.dispatchSuccess(notify.successMessage)
      return {message: 'success', data: data}
    }).catch((err) => {
      if (!err) return

      if (notify.showError) this.dispatchError(err)
      return {message: 'error', data: err?.response?.data}
    })
  },
  dispatchSuccess(message) {

  },
  dispatchError(err) {
    let error = err.response ? err.response : err

    let message = ''

    if ([401, 403, 422, 500, 429].includes(error.status))
      message = error.statusText + '! ' + error.data.message
    else if (error.status === 419)
      message = 'CORES Error! ' + error.data.message
    else message = 'Some Error Occurred!'

  }
}

export default $api
