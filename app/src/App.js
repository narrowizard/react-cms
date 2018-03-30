import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import { LoginComponent } from './components/user/login';
import { LayoutComponent } from './components/layout';
import { getRouter } from './router';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/login" component={LoginComponent}></Route>
          <Route path="/layout" component={LayoutComponent}>
            {getRouter()}
          </Route>
        </div>
      </Router>
    );
  }
}

export default App;