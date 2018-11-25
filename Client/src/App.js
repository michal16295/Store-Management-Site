import React, { Component } from "react";
import Login from "./components/Login";
<<<<<<< HEAD
import Mclient from "./components/Mclient";
=======

>>>>>>> 6613ebdf4f5540a1b645185927ecd304b2d51dba
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
