import React, { Component } from 'react';

export default class Rate extends Component {
  state = {
    id: '',
    rating: ''
  };
  onClick = () => {
    this.props.history.push('/RateWorkers');
  };
  render() {
    return (
      <div className="container-login100">
        <h1>{`Please Rate the User ID :${this.props.match.params.id}`}</h1>
        <div>
          <button onClick={this.onClick}>Submit</button>
        </div>
      </div>
    );
  }
}
