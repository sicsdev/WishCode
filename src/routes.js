import React from 'react';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import UserRegister from './pages/UserRegister';

const routes = () => {
    return (
        <Router>
            <div className="App"> 
            <Routes>
                <Route path = "/login" element = {<Login />} />
                <Route path = "/user-register" element = {<UserRegister />} />
            </Routes>  
            </div>
        </Router>
    )
};

export default routes
