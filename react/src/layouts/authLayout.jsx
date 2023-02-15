import {Outlet, useNavigate} from "react-router-dom";
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getUser} from "../api/auth";
import {user} from "../store/authSlice";

const theme = createTheme();

const AuthLayout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)

  useEffect(() => {
    if (auth.token) {
      getUser().then(response => {
        if (response.message === 'success') {
          dispatch(user(response.data))
          if (auth.isLoggedIn) navigate('/dashboard')
        }
      })
    }
  }); // [] calls only in first render ...
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <Outlet/>
        </Container>
      </ThemeProvider>
    </>
  )
}
export default AuthLayout
