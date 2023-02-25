import $api from '../composables/useRequest.js';

export default {
  install: (app, options) => {
    // inject a globally available $translate() method
    app.config.globalProperties.__api = (key) => {
      // retrieve a nested property in `options`
      // using `key` as the path
      return 'Hello'
    }
  }
}
