import React from 'react';
import { connect } from 'react-redux';
import '../../css/LoginPage.css';
import '../../fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import '../../fonts/fontawesome-free-5.5.0-web/css/all.css';
import '../../css/navbar.css';
import '../../css/button.scss';
import { Redirect } from 'react-router-dom';

import { userActions } from '../../actions';

class referralsCustomers extends React.Component {
  constructor(props) {
    super(props);

    this.loadCustomers = this.loadCustomers.bind(this);
    this.loadCustomers();
  }

  loadCustomers() {
    const { dispatch } = this.props;
    dispatch(userActions.getReferralsCustomers(this.props.id));
  }

  render() {
    const { customers } = this.props;
    const { id } = this.props;
    let customersArray = [
      <tr id="0" key="0">
        <th>ID:</th>
        <th>First Name:</th>
        <th>Last Name:</th>
        <th>Phone:</th>
        <th>Points Received:</th>
      </tr>
    ];
    if (customers) {
        customers.forEach(customer => {
        let row = (
          <tr id={customer.id} key={customer.id}>
            <th>{customer.id}</th>
            <th>{customer.firstName}</th>
            <th>{customer.lastName}</th>
            <th>{customer.phone}</th>
            <th style= {{color: "lime"}}>100</th>
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
            <span class="login100-form-title p-b-34 p-t-27">Customers Brought</span>
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
  const { id } = state.authentication.user;
  return {
    message: message,
    customers: items,
    error: error,
    id: id
  };
}

const connectedreferralsCustomers = connect(mapStateToProps)(referralsCustomers);
export { connectedreferralsCustomers as referralsCustomers };
