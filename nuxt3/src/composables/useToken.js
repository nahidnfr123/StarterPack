export default function accessToken(token = useCookie('token').value || null) {
  const cookieOptions = {
    maxAge: 60 * 60 * 24 * 7,
    priority: 'high',
    // httpOnly: true, // Secure cooke ... don't allow javascript to access cookie
    secure: true
  }
  const savedToken = useCookie('token', cookieOptions)
  savedToken.value = token // Set Token to the cookie ...
  return savedToken.value || null // Return the current cookie value ...
}
