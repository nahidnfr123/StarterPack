import {Outlet, useNavigate} from "react-router-dom";
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef} from "react";
import {getUser} from "../api/auth";
import {setUser} from "../store/authSlice";

const theme = createTheme();

const AuthLayout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)
  const isMounted = useRef(false)

  useEffect(() => {
    if (auth.token && !isMounted.current) {
      getUser().then(response => {
        if (response.message === 'success') dispatch(setUser(response.data))
      })
    }
    // if (auth.isLoggedIn) navigate('/dashboard')
    return () => {
      isMounted.current = true;
    };
  }); // [] calls only in first render ...
  // }, [auth]); // [] calls only in first render ...

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
