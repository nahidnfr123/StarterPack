// import {useDispatch} from "react-redux";
import {Alert, Button} from "@mui/material";
import React, {useState} from "react";
import {Link} from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {Field, Form, Formik, ErrorMessage} from "formik";
import * as Yup from 'yup';
// import {setUser} from "../../store/authSlice";
import $api from "../../api";
import Grid from "@mui/material/Grid";

function ForgetPassword() {
  // const navigate = useNavigate()
  // const dispatch = useDispatch()
  const [successMessage, setSuccessMessage] = useState('')

  const ValidationSchema = Yup.object().shape({
    email: Yup.string()
        .required('Email field is required.')
        .email('Invalid email'),
  });

  const initialValues = {
    email: '',
    password_reset_link: window.location.host + '/auth/reset-password'
  }

  const handleSubmit = async (values, props) => {
    const formData = new FormData();
    for (let key in values) {
      if (values[key].trim()) formData.append(key, values[key].trim())
    }

    const request = await $api.post('send-password-reset-link', formData)
    if (request.message === 'success') {
      setSuccessMessage(request.data.status || request.data.email)
    } else {
      if (request.data.errors) props.setErrors(request?.data?.errors)
    }
  }

  return (
      <>
        <Box
            sx={{
              marginTop: 4,
              marginBottom: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
        >
          <Typography component="h1" variant="h5">Verify Email</Typography>
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

                  <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{mt: 3, mb: 2}}
                      disabled={isSubmitting}
                  >
                    Send Password Reset Link
                  </Button>
                </Form>
            )}
          </Formik>
          <Grid container>
            <Grid item xs>
            </Grid>
            <Grid item>
              <Link to="/auth/login" variant="body2">
                {"Back to Login"}
              </Link>
            </Grid>
          </Grid>

          <Box
              sx={{
                marginTop: 4,
              }}>
            {successMessage &&
                <Alert severity="success">{successMessage}</Alert>
            }
          </Box>
        </Box>
      </>
  );
}

export default ForgetPassword;
