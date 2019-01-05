import React from 'react';
import { connect } from 'react-redux';
import DatePicker from "react-datepicker";
import '../../css/LoginPage.css'
import '../../fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import '../../fonts/fontawesome-free-5.5.0-web/css/all.css';
import '../../css/navbar.css';
import "react-datepicker/dist/react-datepicker.css";

import { userActions } from '../../actions';


class profit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: null,
            endDate: null
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e){
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    handleSubmit(e){
        e.preventDefault();

        this.setState({ submitted: true });
        const { user, dispatch } = this.props;

        let userId = this.state.userId;
        if (user.role !== 'admin') {
            userId = user.id;
        }
        const date = {
            month: parseInt(this.state.month)+1,
            year: parseInt(this.state.year)
        }
        
        if (date && userId) {
            const { dispatch } = this.props;
            dispatch(userActions.getSalary(userId, date));
        }
    }

    render() {
        const showMenu = (<div className="login100-form">
            <DatePicker
                selected={this.state.startDate}
                onChange={this.handleChange}
            />
            <DatePicker
                selected={this.state.endDate}
                onChange={this.handleChange}
            />
            <div className="container-login100-form-btn">
                <button className="login100-form-btn" onClick={this.handleSubmit}>
                Submit
                </button><br/>
            </div></div>);
        let salaryData = null;
        
        if (salary) {
            const headers = [(<td>Date:</td>),(<td>Base:</td>),(<td>Bonus:</td>),(<td>Total:</td>)];
            const table = salary.salary.map(s => {
                return (<tr>
                    <td>{this.formatDate(s.date)}</td>
                    <td>{s.base}</td>
                    <td>{s.bonus}</td>
                    <td>{s.total}</td>
                </tr>);
            });
            salaryData = (<div className="salary"><table>
                <tbody>
                  <tr>{headers}</tr>
                  {table}
                </tbody>
              </table>
              Rating Bonus: {salary.ratingBonus}<br/>
              Total: {salary.total}
              </div>);
        }
        return (
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100">
                    <span className="login100-form-logo">
                        <i className="fas fa-info-circle fa-2x " ></i>
                    </span>
                    <span className="login100-form-title p-b-34 p-t-27">
                        Profit
                    </span>
                        {showMenu}
                        <br/>
                        {salaryData}
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
    const { user } = state.authentication;

    return {
        message: message,
        error: error,
        user: user
    };
}

const connectedProfitList = connect(mapStateToProps)(profit);
export { connectedProfitList as profit }; 