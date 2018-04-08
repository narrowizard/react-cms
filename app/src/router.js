import React from 'react';
import { Route } from 'react-router-dom';
import { UserManageComponent } from './components/manager/user';
import { UserNew } from './components/manager/user_new';


export function getRouter() {
    return [
        <Route key={1} exact path="/layout/manager/user" component={UserManageComponent}></Route>,
        <Route key={3} path="/layout/manager/user/new" component={UserNew}></Route>,
        <Route key={2} path="/layout/manager/user"></Route>
    ]
}