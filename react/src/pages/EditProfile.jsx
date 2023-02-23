import {useDispatch, useSelector} from "react-redux";
import {Button, Divider} from "@mui/material";
import React from "react";
import {setUser} from "../store/authSlice";
import $api from "../api";
import {useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {Field, Form, Formik, ErrorMessage} from "formik";
import * as Yup from 'yup';

function Profile() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const auth = useSelector((state) => state.auth)
  const user = auth.user

  const ValidationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Name field is required.')
        .min(2, 'Minimum 2 letters.')
        .max(50, 'Maximum 50 letters'),
    email: Yup.string()
        .required('Email field is required.')
        .email('Invalid email'),
    current_password: Yup.string()
        .notRequired()
        .min(6, 'Minimum 6 characters!')
        .max(60, 'Maximum 60 characters'),
    password: Yup.string()
        .notRequired()
        .min(6, 'Minimum 6 characters!')
        .max(60, 'Maximum 60 characters'),
    password_confirmation: Yup.string()
        .notRequired()
        .min(6, 'Minimum 6 characters!')
        .max(60, 'Maximum 60 characters'),
  });

  const initialValues = {
    name: user?.name,
    email: user?.email,
    current_password: '',
    password: '',
    password_confirmation: '',
  }

  const handleSubmit = async (values, props) => {
    // console.log(props)
    // event.preventDefault();
    const formData = new FormData();
    formData.append('_method', 'PUT')
    for (let key in values) {
      if (values[key] && values[key].trim()) formData.append(key, values[key].trim())
    }

    const request = await $api.post('user', formData)
    if (request.message === 'success') {
      dispatch(setUser(request.data))
      navigate('/profile')
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
          <Typography component="h1" variant="h5">Update Profile</Typography>
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
                      autoComplete=""
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

                  <Divider>
                    <small>Credential</small>
                  </Divider>

                  <Field
                      as={TextField}
                      error={!!errors.current_password && touched.current_password}
                      margin="normal"
                      fullWidth
                      name="current_password"
                      label="Current Password"
                      type="password"
                      id="currentPassword"
                      autoComplete="current-password"
                      helperText={<ErrorMessage name='current_password'/>}
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
                    Update Account
                  </Button>
                </Form>
            )}
          </Formik>
        </Box>
      </>
  );
}

export default Profile;
