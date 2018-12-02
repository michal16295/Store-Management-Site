import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import WorkerMenu from './Menu/worker.menu';
import AdminMenu from './Menu/admin.menu';
import CustomerMenu from './Menu/customer.menu';
import { userActions }  from '../actions/index';
import '../css/navbar.css'


class Navbar extends React.Component {
    handleLogOut(e){
        e.preventDefault();
        this.props.dispatch(userActions.logout());
    }
    render() {
        const { loggedIn } = this.props;
        const { user } = this.props;
        const { role } = this.props.user || '';
        let showMenu = (<div className="bar">Welcome to ATMD</div>);
        if (role === 'admin') {
            showMenu = (<AdminMenu />);
        } else if (role === 'worker') {
            showMenu = (<WorkerMenu />);
        } else if (role === 'customer') {
            showMenu = (<CustomerMenu />);
        }
        return (
            <div> 

                {loggedIn ? (
                <div class="btn-group">
                     <div class="menu">Hello {user.firstName}</div>
                        <a onClick={this.handleLogOut.bind(this)} class="button">Log-Out</a>
                        <a href='/contacts' class="button">Contacts</a>
                        <a href='/about' class="button">About</a>
                        <a href='/' class="button">Home</a>
                        {showMenu}
                    </div>
                 ):(<div className="bar">Welcome to ATMD</div>)
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggedIn, user } = state.authentication;
    return {
        loggedIn,
        user
    };
}

const navbarPage = connect(mapStateToProps)(Navbar);
export { navbarPage as Navbar };