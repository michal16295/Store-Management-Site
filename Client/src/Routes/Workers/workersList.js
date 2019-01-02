import React from 'react';
import { connect } from 'react-redux';
import '../../css/LoginPage.css';
import '../../fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import '../../fonts/fontawesome-free-5.5.0-web/css/all.css';
import '../../css/navbar.css';
import '../../css/button.scss';
import { Redirect } from 'react-router-dom';

import { userActions } from '../../actions';

class workersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false
    };

    this.loadWorkers = this.loadWorkers.bind(this);
    this.loadWorkers();
  }

  loadWorkers() {
    const { dispatch } = this.props;
    dispatch(userActions.getWorkers());
  }

  render() {
    const { workers } = this.props;
    const { role } = this.props;
    let workersArray = [
      <tr id="0" key="0">
        <th>ID:</th>
        <th>First Name:</th>
        <th>Last Name:</th>
        <th>Phone:</th>
        {role === 'admin' ? <th /> : null}
      </tr>
    ];
    let edit = <div>{edit ? <Redirect to="/" /> : null}</div>;
    if (workers) {
      workers.forEach(worker => {
        let row = (
          <tr id={worker.id} key={worker.id}>
            <th>{worker.id}</th>
            <th>{worker.firstName}</th>
            <th>{worker.lastName}</th>
            <th>{worker.phone}</th>
            {role === 'admin' ? (
              <th>
                <a className="buttonR" href={`/worker/${worker.id}`}>
                  View
                </a>
              </th>
            ) : null}
          </tr>
        );
        workersArray.push(row);
      });
    }
    let list = (
      <div>
        <table>{workersArray}</table>
      </div>
    );
    return (
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <span class="logo-star">
              <i class="fas fa-list fa-2x" />
            </span>
            <span class="login100-form-title p-b-34 p-t-27">Workers List</span>
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
  const { error, message } = state.alert;
  const { items } = state.users;
  const { role } = state.authentication.user;
  return {
    message: message,
    workers: items,
    error: error,
    role: role
  };
}

const connectedWorkersList = connect(mapStateToProps)(workersList);
export { connectedWorkersList as workersList };
