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
import {Link} from "react-router-dom";
import * as Yup from "yup";
import {useDispatch} from "react-redux";
import {ErrorMessage, Field, Form, Formik} from "formik";


export default function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const initialValues = {
    email: '',
    password: '',
  }

  const ValidationSchema = Yup.object().shape({
    email: Yup.string()
        .required('Email field is required.')
        .email('Invalid email'),
    password: Yup.string()
        .required('Password field is required.')
        .min(6, 'Minimum 6 characters!')
        .max(60, 'Maximum 60 characters'),
  });

  const handleSubmit = async (values, props) => {
    // console.log(props)
    // event.preventDefault();
    const formData = new FormData();
    for (let key in values) {
      if (values[key].trim()) formData.append(key, values[key].trim())
    }

    const request = await auth.login(formData)
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
          <Typography component="h1" variant="h5">
            Log In
          </Typography>
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
                      helperText={<ErrorMessage name='password'/>}
                  />
                  <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{mt: 3, mb: 2}}
                      disabled={isSubmitting}
                  >
                    Login
                  </Button>
                </Form>
            )}
          </Formik>
          <Grid container>
            <Grid item xs>
              <Link to="/auth/verify-email" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/auth/register" variant="body2">
                {"Don't have an account? Register"}
              </Link>
            </Grid>
          </Grid>
        </Box>
        {/*<Copyright sx={{mt: 8, mb: 4}}/>*/}
      </>
  );
}
