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
            year: 0,
            month: 0,
            months: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
            ]
        }

        this.handleEdit = this.handleEdit.bind(this);
        this.loadSalary = this.loadSalary.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    loadSalary(workerId) {
        const date = {
            month: this.state.month,
            year: this.state.year
        }
        const { dispatch } = this.props;
        dispatch(userActions.getSalary(workerId, date));
    }

    render() {
      const { salary } = this.state;
      const showMenu = (<div></div>); // TODO change from here
      let info = null;
      if (user) {
        info = (<div>
          <form method="put" class="login100-form validate-form">
          <div id="personal-info" class="wrap-input100" >ID: {user.id}</div>
           <label id="personal-info"  class="wrap-input100 validate-input" data-validate="Enter First Name">First Name: 
                    <input id="personal-input" type="text" name="firstName" placeholder={user.firstName} value={firstName} onChange={this.handleChange}/>
            </label>

            <label id="personal-info" class="wrap-input100 validate-input" data-validate="Enter Last Name">Last Name: 
                    <input id="personal-input" type="text" name="lastName" placeholder={user.lastName} value={lastName} onChange={this.handleChange}/>
            </label>

            <label id="personal-info" class="wrap-input100 validate-input" data-validate="Enter Phone Number">Phone: 
                    <input id="personal-input" type="text" name="phone" placeholder={user.phone} value={phone} onChange={this.handleChange}/>
            </label>
          <div id="personal-info" class="wrap-input100">Role: {user.role}</div>
          </form>
          <div class="container-login100-form-btn">
                <button class="login100-form-btn"  onClick={this.handleSubmit}>
                  Submit
                </button><br/>
          </div>
          <a id="resetButton" href="/" >Cancel</a>
        </div>);
      }
        return (
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100">
                    <span class="login100-form-logo">
                        <i class="fas fa-info-circle fa-2x " ></i>
                    </span>
                    <span class="login100-form-title p-b-34 p-t-27">
                        Salary
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
    const { salary } = state.users;

    return {
        message: message,
        salary: salary,
        user: items,
        error: error,
    };
}

const connectedPersonalInfoList = connect(mapStateToProps)(personalInfo);
export { connectedPersonalInfoList as personalInfo }; 