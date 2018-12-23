import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import '../../css/LoginPage.css'
import '../../fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import '../../fonts/fontawesome-free-5.5.0-web/css/all.css';
import '../../css/navbar.css'

import { productsActions } from '../../actions';

class addProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product:{
                name: '',
                id: '',
                sellingPrice: '',
                buyingPrice: ''
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { product } = this.state;
        this.setState({
            product: {
                ...product,
                [name]: value
            }
        });
    }
    
    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { product } = this.state;
        const { dispatch } = this.props;
        if (product.name && product.id && product.sellingPrice && product.buyingPrice) {
            dispatch(productsActions.addProduct(product));
        }
        
    }

    render() {
        const { product, submitted } = this.state;
        return (
            <div class="limiter">
                <div class="container-login100">
                    <div class="wrap-login100">
                        <form method="post" class="login100-form validate-form">
                        <span class="login100-form-logo">
                            <i class="fas fa-shipping-fast"></i>
                        </span>
                        <span class="login100-form-title p-b-34 p-t-27">
                       Add a New Product
                        </span>

                        <div class="wrap-input100 validate-input" data-validate="Enter User ID">
                        <input class="input100" type="text" name="id" placeholder="ID" value={product.id} onChange={this.handleChange}/>
                        {submitted && !product.id &&
                            <div id="empty-fields" >ID is required</div>
                        }
                        <span class="focus-input100" ><i id="icon" class="fa fa-address-book"/></span>
                        </div>

                        <div class="wrap-input100 validate-input" data-validate="Enter A Name">
                        <input class="input100" type="text" name="name" placeholder="Product Name" value={product.name} onChange={this.handleChange}/>
                        {submitted && !product.name &&
                            <div id="empty-fields" >Name is required</div>
                        }
                        <span class="focus-input100" ><i id="icon" class="fas fa-archive"/></span>
                        </div>

                        <div class="wrap-input100 validate-input" data-validate="Enter Selling Price">
                        <input class="input100" type="text" name="sellingPrice" placeholder="Selling Price" value={product.sellingPrice} onChange={this.handleChange}/>
                        {submitted && !product.sellingPrice &&
                            <div id="empty-fields" >Selling Price is required</div>
                        }
                        <span class="focus-input100" ><i id="icon" class="fas fa-dollar-sign" style={{color: "lime"}}/></span>
                        </div>

                        <div class="wrap-input100 validate-input" data-validate="Enter Buying Price">
                        <input class="input100" type="text" name="buyingPrice" placeholder="Buying Price" value={product.buyingPrice} onChange={this.handleChange}/>
                        {submitted && !product.buyingPrice &&
                            <div id="empty-fields" >Buying Price is required</div>
                        }
                        <span class="focus-input100" ><i id="icon" class="fas fa-dollar-sign" style={{color: "red"}}/></span>
                        </div>
                        <div class="container-login100-form-btn">
                            <button class="login100-form-btn" onClick={this.handleSubmit}>
                            Submit
                            </button><br/>
                        </div>
                        </form>
                        {this.props.message ? <div id="success-msg">{this.props.message.message}</div> : null}
                         {this.props.error ? <div id="invalid-input">{this.props.error}</div> : null}
                         <Link id="resetButton" to='/'>Cancel</Link>
                    </div>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    const { error, message } = state.alert;
    return {
        message: message,
        error: error
    };
}

const connectedaddProduct = connect(mapStateToProps)(addProduct);
export { connectedaddProduct as addProduct }; 