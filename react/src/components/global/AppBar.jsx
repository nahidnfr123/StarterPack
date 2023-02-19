// import {NavLink} from "react-router-dom";
// import { RiHome3Line } from "react-icons/ri";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {removeUser} from "../../store/authSlice";


const pages = [{title: 'Home', link: '/'}, {title: 'Dashboard', link: '/dashboard'}];
const settings = [{title: 'User Name', link: '/profile'}, {title: 'Profile', link: '/profile'}];

export function ResponsiveAppBar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const auth = useSelector((state) => state.auth)
  if (auth.isLoggedIn) settings[0].title = auth?.user?.name || ''

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (link) => {
    if (link) navigate(link)
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (link) => {
    if (link) navigate(link)
    setAnchorElUser(null);
  };

  const LogOut = () => {
    dispatch(removeUser())
    navigate('/auth/login')
  };

  return (
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>
            <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: {xs: 'none', md: 'flex'},
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
            >
              LOGO
            </Typography>

            <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
              <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
              >
                <MenuIcon/>
              </IconButton>
              <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: {xs: 'block', md: 'none'},
                  }}
              >
                {pages.map((page, i) => (
                    <MenuItem key={i} onClick={() => handleCloseNavMenu(page.link)}>
                      <Typography textAlign="center">{page.title}</Typography>
                    </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}/>
            <Typography
                variant="h5"
                noWrap
                component="a"
                href=""
                sx={{
                  mr: 2,
                  display: {xs: 'flex', md: 'none'},
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
            >
              LOGO
            </Typography>
            <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
              {pages.map((page, i) => (
                  <Button
                      key={i}
                      onClick={() => handleCloseNavMenu(page.link)}
                      sx={{my: 2, color: 'white', display: 'block'}}
                  >
                    {page.title}
                  </Button>
              ))}
            </Box>

            {auth.isLoggedIn &&
                <Box sx={{flexGrow: 0}}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                      <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg"/>
                    </IconButton>
                  </Tooltip>
                  <Menu
                      sx={{mt: '45px'}}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting, index) => (
                        <MenuItem key={index} onClick={() => {
                          handleCloseUserMenu(setting.link)
                        }}>
                          <Typography textAlign="center">{setting.title}</Typography>
                        </MenuItem>
                    ))}

                    <MenuItem onClick={LogOut}>
                      <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                  </Menu>
                </Box>
            }

          </Toolbar>
        </Container>
      </AppBar>
  );
}

export default ResponsiveAppBar;
