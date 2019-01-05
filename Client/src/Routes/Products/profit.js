import React from 'react';
import { connect } from 'react-redux';
import DatePicker from "react-datepicker";
import '../../css/LoginPage.css'
import '../../fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import '../../fonts/fontawesome-free-5.5.0-web/css/all.css';
import '../../css/navbar.css';
import "react-datepicker/dist/react-datepicker.css";
import * as utils from '../../utils/date-utils';
import { productsActions } from '../../actions';


class profit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            endDate: new Date(),
            error: ''
        }

        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

        if (this.state.startDate > this.state.endDate) {
            this.setState({error: 'Start date cannot be greater than end date'});
            return;
        } else {
            this.setState({error: ''});
        }

        const { dispatch } = this.props;
        dispatch(productsActions.getProfit(this.state.startDate, this.state.endDate));

    }

    render() {
        const { profit } = this.props;
        const showMenu = (<div className="login100-form salary">
        Start Date:&nbsp;
            <DatePicker
                selected={this.state.startDate}
                onChange={this.handleChangeStart}
            />&nbsp;
        End Date:&nbsp;
            <DatePicker
                selected={this.state.endDate}
                onChange={this.handleChangeEnd}
            />
            <div className="container-login100-form-btn">
                <button className="login100-form-btn" style={{zIndex: 0}} onClick={this.handleSubmit}>
                Submit
                </button><br/>
            </div></div>);
        let profitData = null;
        
        if (profit) {
            const headers = [(<td>Date:</td>),(<td>Name:</td>),(<td>Quantity:</td>),(<td>Price:</td>),(<td>Current Quantity:</td>)];
            const table = profit.profitData.logs.map(s => {
                const color = s.direction === 'sell' ? 'rgba(0, 255, 0, 0.4)' : 'rgba(255, 0, 0, 0.4)';
                return (<tr style={{backgroundColor: color}}>
                    <td>{utils.formatDate(s.date)}</td>
                    <td>{s.name}</td>
                    <td>{s.quantity}</td>
                    <td>{s.price}</td>
                    <td>{s.product_id ? s.product_id.quantity : <i>Deleted from DB</i>}</td>
                </tr>);
            });
            profitData = (<div className="salary"><table>
                <tbody>
                    <tr>{headers}</tr>
                    {table}
                    <tr>Total Bought: {profit.profitData.totalBuy}</tr>
                    <tr>Total Sold: {profit.profitData.totalSell}</tr>
                    <tr>Total: {profit.profitData.total}</tr>
                </tbody>
              </table>
              </div>);
        }
        const { error } = this.state;
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
                        {error ? <div id="invalid-input">{error}</div> : null}
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