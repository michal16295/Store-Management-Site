import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../../actions/index';
import '../../css/homepage.scss';

class HomePage extends React.Component {
  handleDeleteUser(id) {
    return e => this.props.dispatch(userActions.delete(id));
  }

  render() {
    const { user, users } = this.props;
    if (!user) {
      window.location.reload();
    }
    return (
      <div className="container-login100">
        <div className="test">Welcome to ATMD</div>
        <div className="sub">Please click on the Menu to start</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return {
    user,
    users
  };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
