import axios from 'axios';
import {getTokenFromLocalStorage} from "./auth";

// axios.defaults.baseURL = process.env.API_URL || `http://127.0.0.1:8000/api/`
// axios.defaults.withCredentials = true

const http = axios.create({
  baseURL: process.env.API_URL || `http://127.0.0.1:8000/api/`,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json',
    'Authorization': `Bearer ${getTokenFromLocalStorage()}`,
  },
  withCredentials: true
})

const $api = {
  setAuthorization() {
    http.defaults.headers = {
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

  }
}

export default $api
