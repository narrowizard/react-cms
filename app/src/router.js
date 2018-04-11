import React from 'react';
import { Route } from 'react-router-dom';
import { UserManageComponent } from './components/manager/user';
import { UserNew } from './components/manager/user_new';


export function getRouter() {
    return [
        <Route key={1} path="/layout/manager/user/list/:page?" component={UserManageComponent}></Route>,
        <Route key={3} path="/layout/manager/user/new" component={UserNew}></Route>,
    ]
}