import React from 'react';
import { connect } from 'react-redux';
import '../../css/LoginPage.css'
import '../../fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import '../../fonts/fontawesome-free-5.5.0-web/css/all.css';
import '../../css/navbar.css';

import { userActions } from '../../actions';


class personalInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          edit: false,
          firstName:'',
          lastName:'',
          phone: '',
        }

        this.handleEdit = this.handleEdit.bind(this);
        this.loadWorker = this.loadWorker.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.loadWorker(props.userId);
    }

    handleEdit(e) {
      e.preventDefault();
      this.setState({edit: !this.state.edit});
    }
    handleChange(e){
      const { name, value } = e.target;
      this.setState({ [name]: value });
    }
    handleSubmit(e){
      let user = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        phone: this.state.phone
      }
      const { dispatch } = this.props;
      if (user) {
          dispatch(userActions.updateUser(this.props.userId, user));
      }
    }

    loadWorker(workerId) {
        const { dispatch } = this.props;
        dispatch(userActions.getWorker(workerId));
    }

    render() {
      const { user } = this.props;
      const { firstName, lastName, phone } = this.state;
      let info = null;
      if (user) {
        info = !this.state.edit ? (<div>
          <div>ID: {user.id}</div>
          <div>Name: {user.firstName + " " + user.lastName}</div>
          <div>Phone: {user.phone}</div>
          <div>Role: {user.role}</div>
          <div class="container-login100-form-btn">
          <button class="login100-form-btn"  onClick={this.handleEdit}>
            Edit
          </button><br/>
          </div>
      </div>) : (<div>
          <form method="put" class="login100-form validate-form">
          <div>ID: {user.id}</div>
           <div>First Name: <div class="wrap-input100 validate-input" data-validate="Enter First Name">
                    <input class="input100" type="text" name="firstName" placeholder={user.firstName} value={firstName} onChange={this.handleChange}/>
                        </div></div>
            <div>Last Name: <div class="wrap-input100 validate-input" data-validate="Enter Last Name">
                    <input class="input100" type="text" name="lastName" placeholder={user.lastName} value={lastName} onChange={this.handleChange}/>
                        </div></div>
            <div>Phone: <div class="wrap-input100 validate-input" data-validate="Enter Phone Number">
                    <input class="input100" type="text" name="phone" placeholder={user.phone} value={phone} onChange={this.handleChange}/>
                        </div></div>
                        </form>
          <div>Role: {user.role}</div>

          <div class="container-login100-form-btn">
                <button class="login100-form-btn"  onClick={this.handleSubmit}>
                  Submit
                </button><br/>
          </div>
        </div>);
      }
        return (
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100">
                    <span class="login100-form-title p-b-34 p-t-27">
                        Personal Info
                    </span>
                        {info}
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
    const { id } = state.authentication.user;
    let items = null;
    if (state.users) {
      items = state.users.items;
    }
    if (message) {
        setTimeout(() => {
            window.location.reload();
        }, 1000)
    }

    return {
        message: message,
        userId: id,
        user: items,
        error: error,
    };
}

const connectedPersonalInfoList = connect(mapStateToProps)(personalInfo);
export { connectedPersonalInfoList as personalInfo }; 