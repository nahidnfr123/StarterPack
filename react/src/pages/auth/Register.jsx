import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import * as auth from "../../services/auth.service.js";
import {useNavigate} from "react-router-dom";
import {removeUser, setTokenUser} from "../../store/authSlice";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import * as Yup from "yup";
import {ErrorMessage, Field, Formik, Form} from "formik";

export default function SignIn() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const initialValues = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  }

  const ValidationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Name field is required.')
        .min(2, 'Minimum 2 letters.')
        .max(50, 'Maximum 50 letters'),
    email: Yup.string()
        .required('Email field is required.')
        .email('Invalid email'),
    password: Yup.string()
        .required('Password field is required.')
        .min(6, 'Minimum 6 characters!')
        .max(60, 'Maximum 60 characters'),
    password_confirmation: Yup.string()
        .required('Confirm Password field is required.')
        .min(6, 'Minimum 6 characters!')
        .max(60, 'Maximum 60 characters'),
  });

  const handleSubmit = async (values, props) => {
    // console.log(props)
    // event.preventDefault();
    const formData = new FormData();
    for (let key in values) {
      if (values[key] && values[key].trim()) formData.append(key, values[key].trim())
    }

    const request = await auth.register(formData)
    if (request.message === 'success') {
      dispatch(setTokenUser(request.data))
      navigate('/dashboard')
    } else {
      removeUser()
      if (request.data.errors) props.setErrors(request?.data?.errors)
    }
  }

  return (
      <>
        <Box
            sx={{
              marginTop: 8,
              marginBottom: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: 400,
              margin: 'auto'
            }}
        >
          <Avatar sx={{m: 2, bgcolor: 'secondary.main'}}>
            <LockOutlinedIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">Register</Typography>
          <Formik
              initialValues={initialValues}
              validationSchema={ValidationSchema}
              onSubmit={handleSubmit}
          >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
              }) => (
                <Form>
                  <Field
                      as={TextField}
                      error={!!errors.name && touched.name}
                      margin="normal"
                      fullWidth
                      id="name"
                      label="Name"
                      name="name"
                      autoComplete="name"
                      helperText={<ErrorMessage name='name'/>}
                  />
                  <Field
                      as={TextField}
                      error={!!errors.email && touched.email}
                      margin="normal"
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      type="email"
                      helperText={<ErrorMessage name='email'/>}
                  />
                  <Field
                      as={TextField}
                      error={!!errors.password && touched.password}
                      margin="normal"
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="password"
                      // validate={validatePassword}
                      helperText={<ErrorMessage name='password'/>}
                  />
                  <Field
                      as={TextField}
                      error={!!errors.password_confirmation && touched.password_confirmation}
                      margin="normal"
                      fullWidth
                      name="password_confirmation"
                      label="Password Confirmation"
                      type="password"
                      id="passwordConfirmation"
                      autoComplete=""
                      helperText={<ErrorMessage name='password_confirmation'/>}
                  />
                  <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{mt: 3, mb: 2}}
                      disabled={isSubmitting}
                  >
                    Register
                  </Button>
                </Form>
            )}
          </Formik>
          <Grid container>
            <Grid item xs>
            </Grid>
            <Grid item>
              <Link to="/auth/login" variant="body2">
                {"Already have an account? Login"}
              </Link>
            </Grid>
          </Grid>
        </Box>
        {/*<Copyright sx={{mt: 8, mb: 4}}/>*/}
      </>
  );
}
