import React from 'react';
import { connect } from 'react-redux';
import '../../css/LoginPage.css'
import '../../fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import '../../fonts/fontawesome-free-5.5.0-web/css/all.css';
import '../../css/navbar.css';
import { Link } from 'react-router-dom';

import { productsActions } from '../../actions';


class productsList extends React.Component {
    constructor(props) {
        super(props);

        this.loadProducts = this.loadProducts.bind(this);
        this.loadProducts();
    }

    loadProducts() {
        const { dispatch } = this.props;
        dispatch(productsActions.getProducts());
    }

    render() {
        const {products} = this.props;
        let productsArray = [(
            <tr id='0' key='0'>
                <th>ID:</th>
                <th>Name:</th>
                <th>Quantity:</th>
                <th>Price:</th>
                <th>Order</th>
            </tr>
        )];
        if (products) {
            products.forEach(product => {
                let row = (
                    <tr id={product.id} key={product.id}>
                        <th>{product.id}</th>
                        <th>{product.name}</th>
                        <th>{product.quantity}</th>
                        <th>{product.sellingPrice}</th>
                        <th>
                            <a className="fas fa-plus-circle fa-2x" style={{color: "lime", textDecoration: "none"}} href={`/Order/${product.id}`} />
                            <a className="fas fa-minus-circle fa-2x" style={{color: "red", textDecoration: "none"}} href={`/Product/${product.id}`} />
                        </th>
                    </tr>
                );
                productsArray.push(row);
            });
        }
        let list = (<div><table>{productsArray}</table></div>);
        return (
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100">
                    <span class="login100-form-title p-b-34 p-t-27">
                        Product List
                    </span>
                        {list}
                        {this.props.message ? <div id="success-msg">{this.props.message.message}</div> : null}
                        {this.props.error ? <div id="invalid-input">{this.props.error}</div> : null}
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
        error: error
    };
}

const connectedProductsList = connect(mapStateToProps)(productsList);
export { connectedProductsList as productsList }; 