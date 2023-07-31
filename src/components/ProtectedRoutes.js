import React from 'react';
import { Route, Navigate, Outlet, Routes } from 'react-router-dom';


const isAuthenticated = () => {
  const id_user = localStorage.getItem('id_user');
  const token = localStorage.getItem('token');
  return id_user && token;
};

const ProtectedRoutes = ({ element: Component, ...rest }) => {
    // let auth = {'token':false}
  return (
    <Routes>
        <Route
        path='/*'
            {...rest}
            element={
                isAuthenticated() ? (
                <Outlet />
                ) : (
                <Navigate to="/login" replace state={{ from: rest.location }} />
                )
            }
            />
    </Routes>
    
  );
};

export default ProtectedRoutes;
