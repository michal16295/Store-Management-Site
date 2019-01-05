import React from 'react';
import { connect } from 'react-redux';
import '../../css/LoginPage.css';
import '../../fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import '../../fonts/fontawesome-free-5.5.0-web/css/all.css';
import '../../css/navbar.css';
import '../../css/button.scss';
import { Redirect } from 'react-router-dom';

import { userActions } from '../../actions';

class customersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false
    };

    this.loadCustomers = this.loadCustomers.bind(this);
    this.loadCustomers();
  }

  loadCustomers() {
    const { dispatch } = this.props;
    dispatch(userActions.getCustomers());
  }

  render() {
    const { customers } = this.props;
    const { role } = this.props;
    let customersArray = [
      <tr id="0" key="0">
        <th>ID:</th>
        <th>First Name:</th>
        <th>Last Name:</th>
        <th>Phone:</th>
      </tr>
    ];
    let edit = <div>{edit ? <Redirect to="/" /> : null}</div>;
    if (customers) {
        customers.forEach(customer => {
        let row = (
          <tr id={customer.id} key={customer.id}>
            <th>{customer.id}</th>
            <th>{customer.firstName}</th>
            <th>{customer.lastName}</th>
            <th>{customer.phone}</th>
          </tr>
        );
        customersArray.push(row);
      });
    }
    let list = (
      <div>
        <table>{customersArray}</table>
      </div>
    );
    return (
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <span class="logo-star">
              <i class="fas fa-list fa-2x" />
            </span>
            <span class="login100-form-title p-b-34 p-t-27">Customers List</span>
            {list}
            {this.props.message ? (
              <div id="success-msg">{this.props.message.message}</div>
            ) : null}
            {this.props.error ? (
              <div id="invalid-input">{this.props.error}</div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { error, message } = state.alert;
  const { items } = state.users;
  const { role } = state.authentication.user;
  return {
    message: message,
    customers: items,
    error: error,
    role: role
  };
}

const connectedcustomersList = connect(mapStateToProps)(customersList);
export { connectedcustomersList as customersList };
