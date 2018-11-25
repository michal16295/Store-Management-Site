import React, { Component } from "react";
import Login from "./components/Login";
import mClient from "./components/mClient";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route exact path="/" component={Login} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
