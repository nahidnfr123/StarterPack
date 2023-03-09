import Cookies from 'js-cookie'

export default function accessToken(token = null, clearToken = false) {
  if (token) {
    Cookies.set('token', token, {
      expires: 7,
      path: '',
      sameSite: 'strict',
      secure: process.env.APP_ENV === 'production'
    })
  }
  if (clearToken) Cookies.remove('token')
  return Cookies.get('token') || null
}
