import React, { Component } from "react";
import "./App.scss";
import ChangePass from "./components/ChangePass";
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
          <div>
            <h1>Welcome to ATMD Please log-in</h1>
            <form class="submission-form" onSubmit={this.onSubmit}>
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
              {this.state.error ? (
                <h4 id="error">Invalid password or Username</h4>
              ) : null}
            </form>
            <div>
              <ChangePass />
            </div>
          </div>
        ) : null}

        <div>
          {this.state.auth ? (
            <div>
              <h1>
                Welcome {this.state.firstName} {this.state.lastName}
              </h1>
              <h4>Your role is : {this.state.role}</h4>
              <button onClick={this.logout}>Log out</button>
            </div>
          ) : (
            <h4>You are not logged in</h4>
          )}
        </div>
      </div>
    );
  }
}

export default App;
