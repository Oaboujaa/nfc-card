import React from 'react';
import { Route, Navigate, Outlet, Routes } from 'react-router-dom';
import { get } from '../http/api';

const isAuthenticated =  async () => {
  const id_user = localStorage.getItem('id_user');
  const token = localStorage.getItem('token');
  const response =  await get('auth/'+id_user);
  if(response.message=="")
  console.log(response)
  return false;
};
/* 
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
 */
const ProtectedRoutes = ({  children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
  
}


export default ProtectedRoutes;
