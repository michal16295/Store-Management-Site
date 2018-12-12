import React, { Component } from 'react';
import { connect } from 'react-redux';

class AboutMe extends Component {
  render() {
    const { user } = this.props;
    console.log('This is the props');
    console.log(this.props);
    return (
      <div>
        <h3>Hello {user}</h3>
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
