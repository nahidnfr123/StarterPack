export default function accessToken(token = localStorage.getItem('token') || null) {
  if (token === '') localStorage.removeItem('token')
  else localStorage.setItem('token', token)
  const savedToken = localStorage.getItem('token')
  return savedToken || null
}
