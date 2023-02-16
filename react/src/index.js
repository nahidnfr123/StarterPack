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
import ForgetPassword from "./pages/auth/ForgetPassword";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <CssBaseline/>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DefaultLayout/>}>
              <Route index element={<Home/>}/>
              <Route path="dashboard" element={<Dashboard/>}/>
              <Route path="profile" element={<Profile/>}/>
              <Route path="edit-profile" element={<EditProfile/>}/>
              <Route path="*" element={<NoPage/>}/>
            </Route>
            <Route path="/auth" element={<AuthLayout/>}>
              <Route path="login" element={<Login/>}/>
              <Route path="register" element={<Register/>}/>
              <Route path="forget-password" element={<ForgetPassword/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </div>
    </Provider>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
