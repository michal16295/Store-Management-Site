import React from 'react';
import { connect } from 'react-redux';
import '../../css/LoginPage.css'
import '../../fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import '../../fonts/fontawesome-free-5.5.0-web/css/all.css';
import '../../css/navbar.css';

import { productsActions } from '../../actions';


class Order extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            quantity: 0,
            total: 0
        }

        this.handleChange = this.handleChange.bind(this);
        this.loadProduct = this.loadProduct.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.loadProduct();
    }

    handleChange(e) {
        const { value } = e.target;
        let total = 0;
        if (value) {
            const {product} = this.props;
            total = product.buyingPrice * value;
        }
        this.setState({ quantity: value, total: total });
    }
    handleSubmit(e){

        const { quantity } = this.state;
        const { id } = this.props.product;
        const { dispatch } = this.props;
        if(id && quantity){
            dispatch(productsActions.orderProduct(id, quantity));
        }
    }

    loadProduct() {
        const { dispatch, match } = this.props;
        const id = parseInt(match.params[0]);
        dispatch(productsActions.getProduct(id));
    }

    render() {
        const {product} = this.props;
        let prod = null;
        if (product) {
            prod = (
                <div>
                    <div className="product-cont">
                        <div className="product">Name: {product.name}</div>
                        <div className="product">Current Quantity: {product.quantity}</div>
                        <div className="product">Buying price: {product.buyingPrice}</div>
                    </div>
                    <div className="product-input">Input: <input className="order-input" type="text" name="quantity" placeholder="Quantity" value={this.state.quantity} onChange={this.handleChange}/>
                    </div>
                    <div className="product">Total price: {this.state.total}</div>
                   <div className = "container-login100-form-btn">
                        <button class="login100-form-btn" onClick={this.handleSubmit} >Submit</button>
                    </div> 
                </div>
            );
        }
        return (
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100">
                    <span class="login100-form-logo">
                            <i class="fas fa-plus-circle fa-2x" ></i>
                        </span>
                    <span class="login100-form-title p-b-34 p-t-27">
                        Product No.{product ? product.id : "-"}
                    </span>
                        {prod}
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
    const { item } = state.products;
    return {
        message: message,
        error: error,
        product: item
    };
}

const connectedOrder = connect(mapStateToProps)(Order);
export { connectedOrder as Order }; 