export default function accessToken(token = useCookie('token').value || null, clear = false) {
  const savedToken = useCookie('token')
  if (clear) savedToken.value = ''
  else savedToken.value = token
  return savedToken.value || null
}
