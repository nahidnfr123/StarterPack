import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import * as auth from "../../api/auth";
import {useNavigate} from "react-router-dom";
import {removeUser, setTokenUser} from "../../store/authSlice";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";

export default function SignIn() {
  /*const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    await auth.register(data)
  };*/
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');


  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name)
    formData.append('email', email)
    formData.append('password', password)
    formData.append('password_confirmation', passwordConfirmation)

    const request = await auth.register(formData)
    if (request.message === 'success') {
      dispatch(setTokenUser(request.data))
      clearForm()
      navigate('/dashboard')
    } else {
      removeUser()
    }
  }

  const clearForm = () => {
    setName('')
    setEmail('')
    setPassword('')
    setPasswordConfirmation('')
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
            }}
        >
          <Avatar sx={{m: 2, bgcolor: 'secondary.main'}}>
            <LockOutlinedIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
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
              Register
            </Button>
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
        </Box>
        {/*<Copyright sx={{mt: 8, mb: 4}}/>*/}
      </>
  );
}
