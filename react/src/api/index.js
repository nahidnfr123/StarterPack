import axios from 'axios';
import {getTokenFromLocalStorage} from "./auth";

// axios.defaults.baseURL = process.env.API_URL || `http://127.0.0.1:8000/api/`
// axios.defaults.withCredentials = true

const http = axios.create({
  baseURL: process.env.API_URL || `http://127.0.0.1:8000/api/`,
  headers: {
    'Content-type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json',
    'Authorization': `Bearer ${getTokenFromLocalStorage()}`,
  },
  withCredentials: true
})

const $api = {
  setAuthorization() {
    http.defaults.headers = {
      'Content-type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Accept': 'application/json',
      'Authorization': `Bearer ${getTokenFromLocalStorage()}`,
    }
  },
  async get(url) {
    return await http.get(url).then((res) => {
      let data = null
      if (res?.data?.data) data = res?.data?.data
      else if (res?.data) data = res?.data
      else data = res

      return {message: 'success', data: data}
    }).catch((err) => {
      if (!err) return

      this.dispatchError(err)
      return {message: 'error', data: err?.response?.data}
    })
  },
  async post(url, data) {
    return await http.post(url, data).then((res) => {
      let data = null
      if (res?.data?.data) data = res?.data?.data
      else if (res?.data) data = res?.data
      else data = res

      return {message: 'success', data: data}
    }).catch((err) => {
      if (!err) return

      this.dispatchError(err)
      return {message: 'error', data: err?.response?.data}
    })
  },
  async delete(url) {
    return await http.delete(url).then((res) => {
      let data = null
      if (res?.data?.data) data = res?.data?.data
      else if (res?.data) data = res?.data
      else data = res

      return {message: 'success', data: data}
    }).catch((err) => {
      if (!err) return

      this.dispatchError(err)
      return {message: 'error', data: err?.response?.data}
    })
  },
  dispatchError(err) {
    let error = err.response
    let message = ''

    if (error.status === 401 || error.status === 403 || error.status === 422 || error.status === 500)
      message = error.statusText + '! ' + error.data.message
    else if (error.status === 419)
      message = 'CORES Error! ' + error.data.message
    else message = 'Some Error Occurred!'

    console.log(error)
    console.log(message)
  }
}

export default $api
