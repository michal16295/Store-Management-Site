import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import StarRatingComponent from 'react-star-rating-component';
import '../../css/LoginPage.css';
import '../../fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import '../../fonts/fontawesome-free-5.5.0-web/css/all.css';
import '../../css/navbar.css';
import '../../css/button.scss';

import { userActions } from '../../actions';

class RateWorkers extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      rating: {},
    };
    
    this.loadWorkers = this.loadWorkers.bind(this);
    this.onStarClick = this.onStarClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loadWorkers();
  }

  loadWorkers() {
    const { dispatch } = this.props;
    dispatch(userActions.getWorkers());

  }
  onStarClick(prevValue, nextValue, name) {
    const { rating } = this.state;
    console.log(name);
    this.setState({
      rating: {
          ...rating,
          [name]: prevValue
      }
  });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { rating } = this.state;
    const { dispatch } = this.props;
    if (Object.keys(rating).length > 0) {
        dispatch(userActions.rateWorker(rating));
    }
}

  render() {
    const { workers } = this.props;
    const { rating } = this.state;
    let workersArray = [
      <tr id="0" key="0">
        <th>ID:</th>
        <th>First Name:</th>
        <th>Last Name:</th>
        <th>Phone:</th>
        <th>Rate The Worker</th>
      </tr>
    ];
    if (workers) {
      console.log(workers);
      workers.forEach(worker => {
        let row = (
          <tr id={worker.id} key={worker.id}>
            <th>{worker.id}</th>
            <th>{worker.firstName}</th>
            <th>{worker.lastName}</th>
            <th>{worker.phone}</th>
            <th>
            <StarRatingComponent 
            name= {worker.id}
            starCount={5}
            value={rating[worker.id]}
            onStarClick={this.onStarClick}
            />
            </th>
          </tr>
        );
        workersArray.push(row);
      });
    }
    let list = (
      <div>
        <table>{workersArray}</table>
        <div class="container-login100-form-btn">
              <button class="login100-form-btn"  onClick={this.handleSubmit}>
                Submit
              </button><br/>
        </div>
      </div>
      
    );
    return (
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
          <span class="login100-form-title p-b-34 p-t-27">
                        Rate The Workers
          </span>
            {list}
            {this.props.message ? (
              <div id="success-msg">{this.props.message.message}</div>
            ) : null}
            {this.props.error ? (
              <div id="invalid-input">{this.props.error}</div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  console.log(state.users.items)
  const { error, message } = state.alert;
  const { items } = state.users;
  return {
    message: message,
    workers: items,
    error: error
  };
}
const connectedWorkersList = connect(mapStateToProps)(RateWorkers);
export { connectedWorkersList as RateWorkers };
