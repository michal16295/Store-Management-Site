import React from 'react';
import { connect } from 'react-redux';
import DatePicker from "react-datepicker";
import '../../css/LoginPage.css'
import '../../fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import '../../fonts/fontawesome-free-5.5.0-web/css/all.css';
import '../../css/navbar.css';
import "react-datepicker/dist/react-datepicker.css";

import { productsActions } from '../../actions';


class profit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            endDate: new Date()
        }

        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.formatDate = this.formatDate.bind(this);
    }
    handleChangeStart(date){
        this.setState({
            startDate: date
          });
    }
    handleChangeEnd(date){
        this.setState({
            endDate: date
          });
    }
    handleSubmit(e){
        e.preventDefault();

        const { dispatch } = this.props;
        dispatch(productsActions.getProfit(this.state.startDate, this.state.endDate));

    }
    formatDate(date) {
        date = new Date(date);
        return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
      }

    render() {
        const { profit } = this.props;
        console.log(profit);
        const showMenu = (<div className="login100-form">
            <DatePicker
                selected={this.state.startDate}
                onChange={this.handleChangeStart}
            />
            <DatePicker
                selected={this.state.endDate}
                onChange={this.handleChangeEnd}
            />
            <div className="container-login100-form-btn">
                <button className="login100-form-btn" onClick={this.handleSubmit}>
                Submit
                </button><br/>
            </div></div>);
        let profitData = null;
        
        if (profit) {
            const headers = [(<td>Date:</td>),(<td>Name:</td>),(<td>Current Quantity:</td>),(<td>Sold:</td>),(<td>Price:</td>)];
            const table = profit.profitData.logs.map(s => {
                return (<tr>
                    <td>{this.formatDate(s.date)}</td>
                    <td>{s.product_id ? s.product_id.name : null}</td>
                    <td>{s.product_id ? s.product_id.quantity : null}</td>
                    <td>{s.quantity}</td>
                    <td>{s.price}</td>
                </tr>);
            });
            profitData = (<div className="salary"><table>
                <tbody>
                  <tr>{headers}</tr>
                  {table}
                </tbody>
              </table>
              Rating Bonus: {profit.profitData.totalBuy}<br/>
              Total Sell: {profit.profitData.totalSell}<br/>
              Total: {profit.profitData.total}
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
                        {profitData}
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
    const { profit } = state.products;

    return {
        message: message,
        error: error,
        profit: profit
    };
}

const connectedProfitList = connect(mapStateToProps)(profit);
export { connectedProfitList as profit }; 