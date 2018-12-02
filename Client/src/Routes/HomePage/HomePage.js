
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../actions/index';

class HomePage extends React.Component {

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }



    render() {
        const { user, users } = this.props;
        if (!user) {
            window.location.reload();
        }
        return (
            <div>
                
               
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