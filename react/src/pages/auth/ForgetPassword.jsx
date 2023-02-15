import {useDispatch} from "react-redux";
import {Button, Divider} from "@mui/material";
import React from "react";
import {useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {Field, Form, Formik, ErrorMessage} from "formik";
import * as Yup from 'yup';
import {setUser} from "../../store/authSlice";
import $api from "../../api";

function ForgetPassword() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const ValidationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    current_password: Yup.string().notRequired().min(6, 'Too Short!').max(60, 'Too Long!'),
    password: Yup.string().notRequired().min(6, 'Too Short!').max(60, 'Too Long!'),
    password_confirmation: Yup.string().notRequired().min(6, 'Too Short!').max(60, 'Too Long!'),
  });

  const initialValues = {
    email: '',
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
      if (values[key].trim()) formData.append(key, values[key].trim())
    }

    const request = await $api.post('reset-password', formData)
    if (request.message === 'success') {
      dispatch(setUser(request.data))
      navigate('/auth/login')
    } else {
      console.log(request.data)
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
                error={!!errors.email}
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
                error={!!errors.current_password}
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
                error={!!errors.password}
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
                error={!!errors.password_confirmation}
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
                Change Password
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
}

export default ForgetPassword;
