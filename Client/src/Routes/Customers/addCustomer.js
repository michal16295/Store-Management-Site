import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import '../../css/LoginPage.css'
import '../../fonts/font-awesome-4.7.0/css/font-awesome.min.css';

import { userActions } from '../../actions';

class addCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user:{
                firstName: '',
                lastName: '',
                phone: '',
                id: ''
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }
    
    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;
        if (user.firstName && user.lastName && user.phone && user.id) {
            dispatch(userActions.newUser(user));
        }
        
    }

    render() {
        const { loggedIn } = this.props;
        const { user, submitted } = this.state;
        return (
            <div class="limiter">
                <div class="container-login100">
                    <div class="wrap-login100">
                        <form method="post" class="login100-form validate-form"/>
                        <span class="login100-form-logo">
                            <i class="fa fa-stroopwafel"></i>
                        </span>
                        <span class="login100-form-title p-b-34 p-t-27">
                       Add a New Customer
                        </span>

                        <div class="wrap-input100 validate-input" data-validate="Enter User ID">
                        <input class="input100" type="text" name="id" placeholder="ID" value={user.id} onChange={this.handleChange}/>
                        {submitted && !user.id &&
                            <div id="empty-fields" >ID is required</div>
                        }
                        <span class="focus-input100" ><i id="icon" class="fa fa-address-book"/></span>
                        </div>

                        <div class="wrap-input100 validate-input" data-validate="Enter First Name">
                        <input class="input100" type="text" name="firstName" placeholder="First Name" value={user.firstName} onChange={this.handleChange}/>
                        {submitted && !user.firstName &&
                            <div id="empty-fields" >First Name is required</div>
                        }
                        <span class="focus-input100" ><i id="icon" class="fa fa-key "/></span>
                        </div>

                        <div class="wrap-input100 validate-input" data-validate="Enter Last Name">
                        <input class="input100" type="text" name="lastName" placeholder="Last Name" value={user.lastName} onChange={this.handleChange}/>
                        {submitted && !user.lastName &&
                            <div id="empty-fields" >Last Name is required</div>
                        }
                        <span class="focus-input100" ><i id="icon" class="fa fa-key "/></span>
                        </div>

                        <div class="wrap-input100 validate-input" data-validate="Enter Phone Number">
                        <input class="input100" type="text" name="phone" placeholder="Phone Number" value={user.phone} onChange={this.handleChange}/>
                        {submitted && !user.phone &&
                            <div id="empty-fields" >Phone is required</div>
                        }
                        <span class="focus-input100" ><i id="icon" class="fa fa-key "/></span>
                        </div>
                        <div class="container-login100-form-btn">
                            <button class="login100-form-btn" onClick={this.handleSubmit}>
                            Submit
                            </button><br/>
                            
                        </div>
                    </div>
                </div>

            </div>

        );
    }
}
function mapStateToProps(state) {
    const { loggedIn } = state.authentication;
    return {
        loggedIn,
    };
}

const connectedaddCustomer = connect(mapStateToProps)(addCustomer);
export { connectedaddCustomer as addCustomer }; 