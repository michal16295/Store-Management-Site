import React, { Component } from "react";

class ChangePass extends Component {
  state = {
    id: "",
    password: "",
    newPassword: ""
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  send = () => {
    let id = this.state.id;
    let password = this.state.password;
    let newPassword = this.state.newPassword;

    fetch("/users/reset", {
      method: "POST",
      body: JSON.stringify({
        id: id,
        password: password,
        newPassword: newPassword
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.send}>
          <div>
            <label>id:</label>
            <input
              name="id"
              value={this.state.id}
              onChange={this.onChange}
              type="text"
            />
          </div>

          <div>
            <label>password:</label>
            <input
              name="password"
              value={this.state.password}
              onChange={this.onChange}
              type="password"
            />
          </div>

          <div>
            <label>newPassword:</label>
            <input
              name="newPassword"
              value={this.state.newPassword}
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

export default ChangePass;
