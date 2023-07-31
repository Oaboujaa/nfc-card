import logo from './logo.svg';

import React, { Fragment,useEffect,useState } from "react";
import { BrowserRouter,Routes, Route, Router } from "react-router-dom";
import './App.css';
import Dashboard from './components/admin/Main';
import Main from './components/screens/Main';
import Login from "./auth/Login";
import Register from "./auth/Register";
import AuthenticationPage from "./auth/AuthenticationPage";
import NewCard from '../../nfc-card/src/components/screens/NewCard';
import ProtectedRoutes from './components/ProtectedRoutes';


function PageNotFound() {
  return (
    <div>
        <p>404 Page not found</p>
    </div>
  );
}

function App() {
  return (

              <Routes>
              <Route path="/" element={<Main/>} />
              <Route path="/auth" element={<AuthenticationPage/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register/>} />  

              {/* <Route element={<ProtectedRoutes/>}>
                <Route path='/Dashboard' element={<Dashboard/>}/>
              </Route> */}
              
              {/* <ProtectedRoutes path="/Dashboard" element={<Dashboard/>} />
              <ProtectedRoutes path='/newcard' element={<NewCard/>} /> */}

              <Route path="/Dashboard" element={
                            <ProtectedRoutes >
                              <Dashboard />
                            </ProtectedRoutes>}
                      />


           {/*    <Route element={<ProtectedRoutes/>}>
                <Route exact path="/Dashboard" element={<Dashboard/>}  />
              </Route> */}

              <Route path="*" element={<PageNotFound />} />
            </Routes>

            

  );
}

export default App;
