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
                <Route path="*" element={<NoPage/>}/>
              </Route>
              <Route path="/auth" element={<AuthLayout/>}>
                <Route path="login" element={<Login/>}/>
                <Route path="register" element={<Register/>}/>
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
      </Provider>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
