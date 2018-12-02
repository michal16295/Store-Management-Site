import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import '../../css/LoginPage.css'
import '../../fonts/font-awesome-4.7.0/css/font-awesome.min.css';


import { userActions } from '../../actions';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            password: '',
            submitted: false,
            
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { id, password } = this.state;
        const { dispatch } = this.props;
        if (id && password) {
            dispatch(userActions.login(id, password));
        }
        
    }

    render() {
        const { loggedIn } = this.props;
        const { id, password, submitted } = this.state;
        let checkLogin = (<div>
                { loggedIn ? <Redirect to='/' /> : null }
            </div>);
        
        return (
            <div class="limiter">
            { checkLogin }
                <div class="container-login100">
                    <div class="wrap-login100">
                        <form method="post" class="login100-form validate-form"/>
                        <span class="login100-form-logo">
                            <i class="fa fa-address-card"></i>
                        </span>
                        <span class="login100-form-title p-b-34 p-t-27">
                        Login
                        </span>

                        <div class="wrap-input100 validate-input" data-validate="Enter User ID">
                        <input class="input100" type="text" name="id" placeholder="ID" value={id} onChange={this.handleChange}/>
                        {submitted && !id &&
                            <div id="empty-fields" >ID is required</div>
                        }
                        <span class="focus-input100" ><i id="icon" class="fa fa-address-book"/></span>
                        </div>

                        <div class="wrap-input100 validate-input" data-validate="Enter Password">
                        <input class="input100" type="password" name="password" placeholder="Password" value={password} onChange={this.handleChange}/>
                        {submitted && !password &&
                            <div id="empty-fields" >password is required</div>
                        }
                        <span class="focus-input100" ><i id="icon" class="fa fa-key "/></span>
                        </div>
                        <div class="container-login100-form-btn">
                            <button class="login100-form-btn" onClick={this.handleSubmit}>
                            Submit
                            </button><br/>
                            
                        </div>
                        {this.props.error ? <div id="invalid-input">{this.props.error}</div> : null}
                        <Link id= "resetButton" to="/reset" >Reset Password</Link>
                    </div>
                </div>

            </div>

        );
    }
}
function mapStateToProps(state) {
    const { loggedIn } = state.authentication;
    const { message } = state.alert;
    return {
        loggedIn,
        error: message
    };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage }; 