import React, { Component } from "react";

class Login extends Component {
  state = {
    id: "",
    password: "",
    role: ""
  };
  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  onSubmit = e => {
    e.preventDefault();
    let id = this.state.id;
    let password = this.state.password;
    fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ id: id, password: password }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => {
      if (response.ok) {
        response.json().then(json => {
          this.setState({ role: json.role });
        });
      }
    });
  };
  render() {
    return (
      <div className="App">
        <form onSubmit={this.onSubmit}>
          <div>
            <label htmlFor="id">Username</label>
            <input
              name="id"
              value={this.state.id}
              onChange={this.onChange}
              type="text"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              name="password"
              value={this.state.password}
              onChange={this.onChange}
              type="password"
            />
          </div>
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default Login;
