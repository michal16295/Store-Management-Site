import React from 'react';
import { connect } from 'react-redux';
import '../../css/LoginPage.css'
import '../../fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import '../../fonts/fontawesome-free-5.5.0-web/css/all.css';
import '../../css/navbar.css';

import { userActions } from '../../actions';


class salary extends React.Component {
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
            ],
            years: [2019,2018]
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
      const showMenu = (<div class="login100-form">Choose date: <select>
          {this.state.months.map((m, index) => {
              return (<option value={index}>{m}</option>)
          })}
          </select><select>
          {this.state.years.map(y => {
              return (<option value={y}>{y}</option>)
          })}
          </select></div>); // TODO change from here
      
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
                        {showMenu}
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
        error: error,
    };
}

const connectedSalaryList = connect(mapStateToProps)(salary);
export { connectedSalaryList as salary }; 