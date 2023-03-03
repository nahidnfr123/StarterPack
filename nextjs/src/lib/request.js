const $api = {
  async get(url) {
    const api_base = process.env.API_URL
    return await fetch(api_base + url, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
        'Authorization': '',
      }
    })
        .then((r) => r.json())
        .then((res) => {
          let data = null
          if (res?.data?.data) data = res?.data?.data
          else if (res?.data) data = res?.data
          else data = res

          return {message: 'success', data: data}
        })
        .catch((err) => {
          if (!err) return
          return {message: 'error', data: err?.response?.data}
        })
  },
  async post(url, payload) {
    console.log('Hello')
    const api_base = process.env.API_URL
    return await fetch(api_base + url, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-type': 'multipart/form-data',
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
        'Authorization': '',
      }
    })
        .then((r) => r.json())
        .then((res) => {
          let data = null
          if (res?.data?.data) data = res?.data?.data
          else if (res?.data) data = res?.data
          else data = res

          return {message: 'success', data: data}
        })
        .catch((err) => {
          if (!err) return
          return {message: 'error', data: err?.response?.data}
        })
  },
  delete() {

  }
}

export default $api
