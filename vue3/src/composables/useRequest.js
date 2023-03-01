import axios from 'axios';
import accessToken from "@/composables/useToken";
import config from "@/config/appConfig";
import {useNotificationStore} from "@/components/notification/notification.store";

const http = axios.create({
  baseURL: config.apiBaseUrl || `http://127.0.0.1:8000/api/`,
  headers: {
    'Content-type': 'multipart/form-data',
    // 'Content-type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json',
    'Authorization': `Bearer ${accessToken()}`,
  },
  withCredentials: true
})

const notifyPayload = {
  showSuccess: true,
  showError: true,
  successMessage: 'Success!',
  errorMessage: 'Some Error Occurred!'
}

const $api = {
  setAuthorization() {
    http.defaults.headers = {
      'Content-type': 'multipart/form-data',
      // 'Content-type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Accept': 'application/json',
      'Authorization': accessToken() ? `Bearer ${accessToken()}` : '',
    }
  },
  async get(url, notify) {
    const notification = {...notifyPayload, ...notify}
    return await http.get(url).then((res) => {
      let data = null
      if (res?.data?.data) data = res?.data?.data
      else if (res?.data) data = res?.data
      else data = res

      if (notification.showSuccess) this.dispatchSuccess(notification.successMessage)
      return {message: 'success', data: data}
    }).catch((err) => {
      if (!err) return
      if (notification.showError) this.dispatchError(err)
      return {message: 'error', data: err?.response}
    })
  },
  async post(url, data, notify) {
    const notification = {...notifyPayload, ...notify}
    return await http.post(url, data).then((res) => {
      let data = null
      if (res?.data?.data) data = res?.data?.data
      else if (res?.data) data = res?.data
      else data = res

      if (notification.showSuccess) this.dispatchSuccess(notification.successMessage)
      return {message: 'success', data: data}
    }).catch((err) => {
      if (!err) return

      if (notification.showError) this.dispatchError(err)
      return {message: 'error', data: err?.response}
    })
  },
  async delete(url, notify) {
    const notification = {...notifyPayload, ...notify}
    return await http.delete(url).then((res) => {
      let data = null
      if (res?.data?.data) data = res?.data?.data
      else if (res?.data) data = res?.data
      else data = res

      if (notification.showSuccess) this.dispatchSuccess(notification.successMessage)
      return {message: 'success', data: data}
    }).catch((err) => {
      if (!err) return

      if (notification.showError) this.dispatchError(err)
      return {message: 'error', data: err?.response}
    })
  },
  dispatchSuccess(message) {
    const {setNotification} = useNotificationStore()
    setNotification({
      "type": "success",
      "title": "Success",
      "message": message,
      "showIcon": true,
      "dismiss": {
        "manually": true,
        "automatically": true
      },
      "duration": 3000,
      "showDurationProgress": true,
      "appearance": "light"
    })
  },
  dispatchError(err) {
    let error = err.response
    let message = ''
    if ([401, 403, 422, 500, 429].includes(error.status)) {
      message = error.statusText + '! ' + error.data.message
    } else if (error.status === 419) {
      message = 'CORES Error! ' + error.data.message
    } else {
      message = 'Some Error Occurred!'
    }

    const {setNotification} = useNotificationStore()

    setNotification({
      "type": "alert",
      "title": "Error",
      "message": message,
      "showIcon": true,
      "dismiss": {
        "manually": true,
        "automatically": true
      },
      "duration": 5000,
      "showDurationProgress": true,
      "appearance": "light"
    })
  }
}

export default $api
