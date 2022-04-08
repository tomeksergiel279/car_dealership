import React from 'react';
import { Redirect, Route } from 'react-router-dom';


const RouteAuthenticated = ({ component: Component, path }) => {

    const user = JSON.parse(localStorage.getItem('user'));

    if (user.userType !== 'employee') {
        return <Redirect to="/home" />;
    }

    return <Route component={Component} path={path} />;
};
export default RouteAuthenticated;
