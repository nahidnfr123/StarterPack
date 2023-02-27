export default function accessToken(token = localStorage.getItem('token') || null, clearToken = false) {
  if (token) localStorage.setItem('token', token)
  if (clearToken) localStorage.removeItem('token')
  const savedToken = localStorage.getItem('token')
  return savedToken || null
}
