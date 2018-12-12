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
            <div className="sticky-top"> 
                {loggedIn ? (
                <div className="btn-group">
                    <div className="logo">&nbsp;&nbsp;&nbsp;</div>
                     <div className="menu">Hello {user.firstName}</div>
                        <a onClick={this.handleLogOut.bind(this)} className="button">Log-Out</a>
                        <a href='/contacts' className="button">Contacts</a>
                        <a href='/about' className="button">About</a>
                        <a href='/' className="button">Home</a>
                        {showMenu}
                    </div>
                 ):(<div>
                    <div className="logo">&nbsp;&nbsp;&nbsp;</div><div className="bar">Welcome to ATMD</div>
                 </div>
                 )
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