import logo from './logo.svg';

import React, { Fragment,useEffect,useState } from "react";
import { BrowserRouter,Routes, Route } from "react-router-dom";
import './App.css';
import Main from './components/admin/Main';



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
          <Route path="*" element={<PageNotFound />} />
        </Routes>

  );
}

export default App;
