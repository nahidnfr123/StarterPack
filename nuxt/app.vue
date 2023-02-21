<script setup>
const baseUrl = 'http://127.0.0.1:8000/api/'
const data = {}
const error = {}

async function handelSubmit () {
  const {data: data, error: error} = await useFetch(baseUrl + 'login', {
    method: 'POST',
    body: {email: 'nahid@gmail.com', password: 'nahid@gmail.com'}
  })
}
</script>
<template>
  <button @click="handelSubmit">BUTTON</button>
  Page visits: {{ data }}
  {{ error }}
</template>
