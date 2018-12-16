import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../css/LoginPage.css';

class AboutMe extends Component {
  render() {
    const { firstName } = this.props.user;
    const { role } = this.props.user;
    const { lastName } = this.props.user;
    const { id } = this.props.user;
    console.log(this.props.user);
    const divStyle = {
      color: 'white'
    };

    return (
      <div className="limiter" style={divStyle}>
        <div className="container-login100">
          <div className="wrap-login100">
            <span class="login100-form-logo">
              <i class="fa fa-address-card" />
            </span>
            <div>
              <h1>
                {' '}
                {firstName} {lastName}
              </h1>
              <h2>Store {role}</h2>
              <h3>Your ID: {id}</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AboutMe;

function mapStateToProps(state) {
  const { loggedIn, user } = state.authentication;
  return {
    loggedIn,
    user
  };
}
const connectedAboutMe = connect(mapStateToProps)(AboutMe);
export { connectedAboutMe as AboutMe };
