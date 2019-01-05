import React from 'react';
import { connect } from 'react-redux';
import '../../css/LoginPage.css';
import '../../fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import '../../fonts/fontawesome-free-5.5.0-web/css/all.css';
import '../../css/navbar.css';
import '../../css/button.scss';
import * as utils from '../../utils/date-utils';
import { productsActions } from '../../actions';

class orderHistory extends React.Component {
  constructor(props) {
    super(props);

    this.loadHistory = this.loadHistory.bind(this);
    this.loadHistory();
  }

  loadHistory() {
    const { dispatch } = this.props;
    dispatch(productsActions.getOrderHistory());
  }

  render() {
    const { products } = this.props;
    console.log(products);
    let productsList = [
      <tr id="0" key="0">
        <th>Date:</th>
        <th>Product Name:</th>
        <th>Price:</th>
        <th>Quantity:</th>
      </tr>
    ];
    if (products) {
      products.forEach(product => {
        let row = (
          <tr id={product.id} key={product.id}>
            <th>{utils.formatDate(product.date)}</th>
            <th>{product.name}</th>
            <th>{product.price}</th>
            <th>{product.quantity}</th>
          </tr>
        );
        productsList.push(row);
      });
    }
    let list = (
      <div>
        <table>{productsList}</table>
      </div>
    );
    return (
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <span class="logo-star">
              <i class="fas fa-list fa-2x" />
            </span>
            <span class="login100-form-title p-b-34 p-t-27">Order History</span>
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
  const { items } = state.products;

  return {
    message: message,
    products: items,
    error: error,
  };
}

const connectedHistoryCustomers = connect(mapStateToProps)(orderHistory);
export { connectedHistoryCustomers as orderHistory };
