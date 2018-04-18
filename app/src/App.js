import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './App.css';
import { LoginComponent } from './components/user/login';
import { LayoutComponent } from './components/layout';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true
    }
  }

  render() {
    return (
      <Router>
        <div>
          <Route path="/login" component={LoginComponent}></Route>
          <Route path="/layout" render={() => {
            if (this.state.loggedIn) {
              return <LayoutComponent />
            } else {
              return <Redirect to="/login" />
            }
          }} ></Route>
        </div>
      </Router>
    );
  }
}

export default App;
