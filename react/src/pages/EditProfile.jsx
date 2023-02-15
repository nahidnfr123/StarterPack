import {useDispatch, useSelector} from "react-redux";
import {Button, Divider} from "@mui/material";
import React, {useState} from "react";
import {removeUser, setUser} from "../store/authSlice";
import $api from "../api";
import {useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

function Profile() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const auth = useSelector((state) => state.auth)
  const user = auth.user


  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('_method', 'PUT')
    formData.append('name', name)
    formData.append('email', email)
    formData.append('current_password', currentPassword)
    formData.append('password', password)
    formData.append('password_confirmation', passwordConfirmation)

    const request = await $api.post('user', formData)
    if (request.message === 'success') {
      dispatch(setUser(request.data))
      clearForm()
      navigate('/profile')
    } else {
      removeUser()
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
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete=""
            autoFocus
            onChange={event => setName(event.target.value)}
            value={name}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            type="email"
            onChange={event => setEmail(event.target.value)}
            value={email}
          />

          <Divider>
            <small>Credential</small>
          </Divider>

          <TextField
            margin="normal"
            required
            fullWidth
            name="current_password"
            label="Current Password"
            type="password"
            id="current_password"
            autoComplete="current-password"
            onChange={event => setCurrentPassword(event.target.value)}
            value={password}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={event => setPassword(event.target.value)}
            value={password}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password_confirmation"
            label="Password Confirmation"
            type="password"
            id="password_confirmation"
            autoComplete=""
            onChange={event => setPasswordConfirmation(event.target.value)}
            value={passwordConfirmation}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 3, mb: 2}}
          >
            Update Account
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default Profile;
