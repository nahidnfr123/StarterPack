import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import './assets/scss/main.scss'
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import DefaultLayout from "./layouts/default";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AuthLayout from "./layouts/authLayout";
import Dashboard from "./pages/Dashboard";
import {Provider} from 'react-redux'
import {store} from './store'
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import ResetPassword from "./pages/auth/ResetPassword";

import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VerifyEmail from "./pages/auth/VerifyEmail";
import PrivateRoutes from "./utils/PrivateRoutes";
import GuestOnlyRoutes from "./utils/GuestOnlyRoutes";


export default function App() {
  return (
      <Provider store={store}>
        <div className="App">
          <CssBaseline/>
          <BrowserRouter>
            <Routes>
              {/* Default Layout */}
              <Route path="/" element={<DefaultLayout/>}>
                <Route index element={<Home/>} exact/>
                {/* protected Routes */}
                <Route element={<PrivateRoutes/>} exact>
                  <Route path="dashboard" element={<Dashboard/>} exact/>
                  <Route path="profile" element={<Profile/>}/>
                  <Route path="edit-profile" element={<EditProfile/>}/>
                </Route>
              </Route>
              {/* Auth Layout */}
              <Route path="/auth" element={<AuthLayout/>}>
                {/* Only Guest Routes */}
                <Route element={<GuestOnlyRoutes/>}>
                  <Route path="login" element={<Login/>} exact/>
                  <Route path="register" element={<Register/>} exact/>
                  <Route path="verify-email" element={<VerifyEmail/>} exact/>
                  <Route path="reset-password" element={<ResetPassword/>} exact/>
                </Route>
              </Route>
              <Route path="*" element={<NoPage/>} exact/>
            </Routes>
          </BrowserRouter>
          <ToastContainer/>
        </div>
      </Provider>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
