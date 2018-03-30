import React from 'react';
import { Route } from 'react-router-dom';
import { UserManageComponent } from './components/manager/user';


export function getRouter() {
    return [
        <Route key={1} path="/layout/manager/user" component={UserManageComponent}></Route>,
        <Route key={2} path="/layout/manager/user"></Route>
    ]
}