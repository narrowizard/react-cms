import React from 'react';
import { Route } from 'react-router-dom';
import { UserManageComponent } from './components/manager/user';
import { UserNew } from './components/manager/user_new';
import { ModuleManageComponent } from './components/manager/module';


export function getRouter() {
    return [
        <Route key={1} path="/layout/manager/user/list/:page?" component={UserManageComponent}></Route>,
        <Route key={2} path="/layout/manager/user/new/:id?" component={UserNew}></Route>,
        <Route key={3} path="/layout/manager/module/list" component={ModuleManageComponent}></Route>,
    ]
}