import React from 'react';
import { connect } from 'react-redux';
import '../../css/LoginPage.css'
import '../../fonts/font-awesome-4.7.0/css/font-awesome.min.css';

import { userActions } from '../../actions';

class deleteWorker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
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
        const { id } = this.state;
        const { dispatch } = this.props;
        if (id) {
            dispatch(userActions.deleteWorker(id));
        }
        
    }

    render() {
        const { id, submitted } = this.state;
        return (
            <div class="limiter">
                <div class="container-login100">
                    <div class="wrap-login100">
                        <form method="post" class="login100-form validate-form">
                        <span class="login100-form-logo">
                            <i class="fa fa-address-card"></i>
                        </span>
                        <span class="login100-form-title p-b-34 p-t-27">
                        Delete Worker
                        </span>

                        <div class="wrap-input100 validate-input" data-validate="Enter User ID">
                        <input class="input100" type="text" name="id" placeholder="ID" value={id} onChange={this.handleChange}/>
                        {submitted && !id &&
                            <div id="empty-fields" >ID is required</div>
                        }
                        <span class="focus-input100" ><i id="icon" class="fa fa-address-book"/></span>
                        </div>

                        <div class="container-login100-form-btn">
                            <button class="login100-form-btn" onClick={this.handleSubmit}>
                            Submit
                            </button><br/>
                        </div>
                            {this.props.message ? <div id="success-msg">{this.props.message.message}</div> : null}
                            {this.props.error ? <div id="invalid-input">{this.props.error}</div> : null}
                        </form>
                    </div>
                </div>

            </div>

        );
    }
}
function mapStateToProps(state) {
    const { message, error } = state.alert;
    console.log(message);
    console.log(error);
    return {
        message: message,
        error: error
    };
}

const connectedDeleteWorker = connect(mapStateToProps)(deleteWorker);
export { connectedDeleteWorker as deleteWorker }; 