import React from 'react';
import { connect } from 'react-redux';
import '../../css/LoginPage.css'
import '../../fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import '../../fonts/fontawesome-free-5.5.0-web/css/all.css';
import '../../css/navbar.css';
import '../../css/button.scss';
import { Link, Redirect } from 'react-router-dom';

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
    handleDelete(id, quantity){
        const { dispatch } = this.props;
        if(quantity != 0){
            const ans = window.confirm("Are you sure you want to delete this item ?");
            if(ans) dispatch(productsActions.deleteProduct(id));
        }
        else{
            if(id){
            dispatch(productsActions.deleteProduct(id));
            }
        }
        const {products} = this.props;
        products.forEach(p => {
            if (p.id == id) {
                p.deleted = true;
            }
        });
    }

    render() {
        const {products} = this.props;
        const {role} = this.props;
        let productsArray = [(
            <tr id='0' key='0'>
                <th>ID:</th>
                <th>Name:</th>
                <th>Quantity:</th>
                <th>Price:</th>
                {role ==="admin" || role === "customer" ? <th>Order</th> : null}
            </tr>
        )];
        if (products) {
            products.forEach(product => {
                if (!product.deleted) {
                    let row = (
                        <tr id={product.id} key={product.id}>
                            <th>{product.id}</th>
                            <th>{product.name}</th>
                            <th>{product.quantity}</th>
                            <th>{product.sellingPrice}</th>
                            <th>
                                {role === "customer" ? <a className="buttonR" href={`/Buy/${product.id}`} title="buy item">Buy</a> : null}
                                {role ==="admin" ? <a className="fas fa-plus-circle fa-2x" style={{color: "lime", textDecoration: "none"}} href={`/Order/${product.id}`} title="Order items to store" /> : null}
                               {role === "admin" ? <button className="fas fa-minus-circle fa-2x" style={{color: "red", textDecoration: "none"}} name="id" value = {product.id} onClick={this.handleDelete.bind(this, product.id, product.quantity)} title="Delete product from database" /> : null}
                            </th>
                        </tr>
                    );
                    productsArray.push(row);
                }
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
    const { role } = state.authentication.user;
    return {
        message: message,
        products: items,
        error: error,
        role: role
    };
}

const connectedProductsList = connect(mapStateToProps)(productsList);
export { connectedProductsList as productsList }; 