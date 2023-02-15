import {Outlet, useNavigate} from "react-router-dom";
import AppBar from "../components/global/AppBar";
import {useEffect, useRef} from "react";
import {getUser} from "../api/auth";
import {removeUser, setUser} from "../store/authSlice";
import {useDispatch} from "react-redux";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Container from '@mui/material/Container';

const theme = createTheme();

const DefaultLayout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isMounted = useRef(false)

  useEffect(() => {
    if (!isMounted.current) {
      getUser().then(response => {
        if (response.message === 'success') dispatch(setUser(response.data))
        else {
          dispatch(removeUser())
          navigate('/auth/login')
        }
      })
    }
    return () => {
      isMounted.current = true;
    };
  }, [dispatch, navigate]); // [] calls only in first render ...
  return (
    <>
      <ThemeProvider theme={theme}>
        <AppBar/>
        <Container component="main" maxWidth="xs">
          {/*{Object.entries(auth).map(([key, value], i) => (
            <div className="item" key={key}>
              {key}: {value}
            </div>
        ))}*/}
          <Outlet/>
        </Container>
      </ThemeProvider>
    </>
  )
}

export default DefaultLayout;
