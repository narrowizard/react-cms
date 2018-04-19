import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './App.css';
import { LoginComponent } from './components/user/login';
import { LayoutComponent } from './components/layout';

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <Route path="/" exact render={() => {
            return <Redirect to="/layout" />
          }} ></Route>
          <Route path="/login" component={LoginComponent}></Route>
          <Route path="/layout" component={LayoutComponent}></Route>
        </div>
      </Router>
    );
  }
}

export default App;
