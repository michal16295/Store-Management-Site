import React from 'react';
import { connect } from 'react-redux';
import '../../css/LoginPage.css'
import '../../fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import '../../fonts/fontawesome-free-5.5.0-web/css/all.css';
import '../../css/navbar.css';

import { userActions } from '../../actions';


class rateList extends React.Component {
    constructor(props) {
        super(props);

        this.loadRatings = this.loadRatings.bind(this);
        this.loadRatings();
    }

    loadRatings() {
        const { dispatch } = this.props;
        dispatch(userActions.getRatings());
    }

    render() {
        const {workers} = this.props;
        let workersArray = [(
            <tr id='0' key='0'>
                <th>ID:</th>
                <th>Full Name:</th>
                <th>Rating:</th>
            </tr>
        )];
        if (workers) {
            workers.forEach(worker => {
                let row = (
                    <tr id={worker.id} key={worker.id}>
                        <th>{worker.id}</th>
                        <th>{worker.name}</th>
                        <th>{worker.rating.toFixed(2)}</th>
                    </tr>
                );
                workersArray.push(row);
            });
        }
        let list = (<div><table>{workersArray}</table></div>);
        return (
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100">
                    <span class="login100-form-title p-b-34 p-t-27">
                        Workers Ratings
                    </span>
                        {list}
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
    const { items } = state.users;

    return {
        message: message,
        workers: items,
        error: error
    };
}

const connectedRateList = connect(mapStateToProps)(rateList);
export { connectedRateList as rateList }; 