import {useDispatch, useSelector} from "react-redux";
import {Button, Divider} from "@mui/material";
import React, {useState} from "react";
import {setUser} from "../store/authSlice";
import $api from "../api";
import {useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {Field, Form, Formik} from "formik";

function Profile() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const auth = useSelector((state) => state.auth)
  const user = auth.user


  const [errors, setErrors] = useState([]);
  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const [currentPassword, setCurrentPassword] = useState('nizaf@mailinator.com');
  const [password, setPassword] = useState('nizaf@mailinator.com');
  const [passwordConfirmation, setPasswordConfirmation] = useState('nizaf@mailinator.com');

  const initialValues = {
    name: user.name,
    email: user.email,
    current_password: '',
    password: '',
    password_confirmation: '',
  }

  const handleSubmit = async (values, props) => {
    // event.preventDefault();
    const formData = new FormData();
    formData.append('_method', 'PUT')
    for (let key in values) {
      formData.append(key, values[key])
    }

    const request = await $api.post('user', formData)
    if (request.message === 'success') {
      dispatch(setUser(request.data))
      clearForm()
      navigate('/profile')
    } else {
      setErrors(request?.data?.errors)
      console.log(errors)
    }
  }

  const clearForm = () => {
    setName('')
    setEmail('')
    setCurrentPassword('')
    setPassword('')
    setPasswordConfirmation('')
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
        <Typography component="h1" variant="h5">
          Update Profile
        </Typography>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
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
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete=""
                autoFocus
              />
              <Field
                as={TextField}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                type="email"
              />

              <Divider>
                <small>Credential</small>
              </Divider>

              <Field
                as={TextField}
                margin="normal"
                required
                fullWidth
                name="current_password"
                label="Current Password"
                type="password"
                id="currentPassword"
                autoComplete="current-password"
              />
              <Field
                as={TextField}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Field
                as={TextField}
                margin="normal"
                required
                fullWidth
                name="password_confirmation"
                label="Password Confirmation"
                type="password"
                id="passwordConfirmation"
                autoComplete=""
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{mt: 3, mb: 2}}
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
