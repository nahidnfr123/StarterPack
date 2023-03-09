import AWN from 'awesome-notifications'

export default defineNuxtPlugin((/* nuxtApp */) => {
  const options = {
    position: 'bottom-right',
    maxNotifications: 5,
    durations: {
      global: 3000,
    },
    icons: {
      enabled: false,
      alert: 'alert',
      prefix: "<Icon size='26' class='mr-2' name='mdi-light:",
      suffix: "'></Icon>"
    }
  }

  return {
    provide: {
      awn: new AWN(options)
    }
  }
})
