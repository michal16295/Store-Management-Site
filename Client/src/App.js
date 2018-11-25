import React, { Component } from "react";
<<<<<<< HEAD
=======
import Login from "./components/Login";
<<<<<<< HEAD
<<<<<<< HEAD
import Mclient from "./components/Mclient";
=======

>>>>>>> 6613ebdf4f5540a1b645185927ecd304b2d51dba
=======
import Mclient from "./components/Mclient";
>>>>>>> c84dafeef82a8b1be933e9bb953f1e4f0c93b061
>>>>>>> d5cc4234a1780fb90eede6023c6c4157d1682688
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import Login from "./components/Login";
import "./App.css";

class App extends Component {
  state = {
    id: "",
    password: "",
    role: "",
    token: "",
    role: "",
    firstName: "",
    lastName: "",
    auth: false,
    error: false
  };
  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  onSubmit = e => {
    e.preventDefault();
    let id = this.state.id;
    let password = this.state.password;
    fetch("/users/login", {
      method: "POST",
      body: JSON.stringify({ id: id, password: password }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => {
      if (response.ok) {
        response.json().then(json => {
          this.setState({
            token: json.token,
            role: json.role,
            id: json.id,
            firstName: json.firstName,
            lastName: json.lastName,
            password: "",
            auth: true,
            error: false
          });
        });
      } else {
        this.setState({ error: true });
      }
    });
  };
  logout = () => {
    this.setState({ auth: false });
  };
  render() {
    return (
      <div className="App">
        {this.state.auth == false ? (
          <form onSubmit={this.onSubmit}>
            <div>
              <label htmlFor="id">Username</label>
              <input
                name="id"
                value={this.state.id}
                onChange={this.onChange}
                type="text"
                required="true"
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                name="password"
                value={this.state.password}
                onChange={this.onChange}
                type="password"
                required="true"
              />
            </div>
            <button>Submit</button>
          </form>
        ) : null}

        <div>
          {this.state.auth ? (
            <div>
              <h4>Welcome {this.state.firstName} </h4>
              <button onClick={this.logout}>Log out</button>
            </div>
          ) : (
            <h4>You are not logged in</h4>
          )}
          {this.state.error ? <h4>Invalid possword or User Id</h4> : null}
        </div>
      </div>
    );
  }
}

export default App;
