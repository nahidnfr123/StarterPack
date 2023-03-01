import $api from "./index";

export async function register(data) {
  const response = await $api.post('/register', {
    name: data.get('name'),
    email: data.get('email'),
    password: data.get('password'),
    password_confirmation: data.get('password_confirmation'),
  });

  if (response.message === 'success') {
    setUserToLocalStorage(response.data)
    $api.setAuthorization()
  }
  return response
}

export async function login(data) {
  const response = await $api.post('/login', {
    email: data.get('email'),
    password: data.get('password'),
  });

  if (response.message === 'success') {
    setUserToLocalStorage(response.data)
    $api.setAuthorization()
  }
  return response
}

export async function logout() {
  const response = await $api.post('/logout', {});

  if (response.message === 'success') removeUserFromLocalStorage()
  return response
}

export async function getUser() {
  const notifyPayload = {
    showSuccess: false,
    showError: false,
    successMessage: 'Success!',
    errorMessage: 'Some Error Occurred!'
  }

  const response = await $api.get('/user', notifyPayload);

  if (response.message === 'success') setUserToLocalStorage({token: getTokenFromLocalStorage(), user: response.data})
  else removeUserFromLocalStorage()
  return response
}

export function removeUserFromLocalStorage() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}

export function setUserToLocalStorage(data) {
  localStorage.setItem('token', JSON.stringify(data.token))
  localStorage.setItem('user', JSON.stringify(data.user))
}

export function getTokenFromLocalStorage() {
  return JSON.parse(localStorage.getItem('token')) || null
}

export function getUserFromLocalStorage() {
  return JSON.parse(localStorage.getItem('user')) || {}
}
