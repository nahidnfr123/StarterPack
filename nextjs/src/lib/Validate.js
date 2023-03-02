export default function login_validation(values) {
  const errors = {}

  if (!values.email) {
    errors.email = 'Email field in required'
  }
}
