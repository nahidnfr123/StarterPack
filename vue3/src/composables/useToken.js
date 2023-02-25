export default function accessToken(token = localStorage.getItem('token') || null) {
  if (token) localStorage.setItem('token', token)
  else localStorage.removeItem('token')
  const savedToken = localStorage.getItem('token')
  return savedToken || null
}
