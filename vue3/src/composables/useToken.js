import Cookies from 'js-cookie'

export default function accessToken(token = null, clearToken = false) {
  if (token) Cookies.set('token', token, {expires: 100, path: '', secure: true})
  if (clearToken) Cookies.remove('token')
  return Cookies.get('token')
}
