import {useDispatch} from "react-redux";
import {Button, Divider} from "@mui/material";
import React from "react";
import {Link, useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {Field, Form, Formik, ErrorMessage} from "formik";
import * as Yup from 'yup';
import {setUser} from "../../store/authSlice";
import $api from "../../api";
import Grid from "@mui/material/Grid";
import {useLocation} from "react-router-dom";

function ForgetPassword() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const myParam = useLocation().search;

  const ValidationSchema = Yup.object().shape({
    password: Yup.string()
        .required('Password field is required.')
        .min(6, 'Minimum 6 characters!')
        .max(60, 'Maximum 60 characters'),
    password_confirmation: Yup.string()
        .required('Confirm Password field is required.')
        .min(6, 'Minimum 6 characters!')
        .max(60, 'Maximum 60 characters'),
  });

  const initialValues = {
    email: new URLSearchParams(myParam).get("email"),
    token: new URLSearchParams(myParam).get("token"),
    password: '',
    password_confirmation: '',
  }

  const handleSubmit = async (values, props) => {
    // console.log(props)
    // event.preventDefault();
    const formData = new FormData();
    formData.append('_method', 'PUT')
    for (let key in values) {
      if (values[key].trim()) formData.append(key, values[key].trim())
    }

    const request = await $api.post('reset-password', formData)
    if (request.message === 'success') {
      dispatch(setUser(request.data))
      navigate('/auth/login')
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
          <Typography component="h1" variant="h5">Reset Password</Typography>
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
                      error={!!errors.password}
                      margin="normal"
                      fullWidth
                      name="password"
                      label="New Password"
                      type="password"
                      id="password"
                      autoComplete="password"
                      // validate={validatePassword}
                      helperText={<ErrorMessage name='password'/>}
                  />
                  <Field
                      as={TextField}
                      error={!!errors.password_confirmation}
                      margin="normal"
                      fullWidth
                      name="password_confirmation"
                      label="New Password Confirmation"
                      type="password"
                      id="password_confirmation"
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
                    Change Password
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
        </Box>
      </>
  );
}

export default ForgetPassword;
