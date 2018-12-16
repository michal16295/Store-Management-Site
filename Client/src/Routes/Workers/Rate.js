import React, { Component } from 'react';

export default class Rate extends Component {
  state = {
    id: '',
    rating: 'Please Select a rating'
  };
  onClick = () => {
    this.props.history.push('/RateWorkers');
  };
  onSelect = ({ target }) => {
    this.setState({ rating: target.val });
  };

  render() {
    const rates = [1, 2, 3, 4, 5, 6];
    const value = this.state.ratings;
    return (
      <div className="container-login100">
        <h1>{`Please Rate the User ID :${this.props.match.params.id}`}</h1>
        <div>
          <select onChange={this.onSelect}>
            <option selected={value === ''}>Please select a Rate</option>
            {rates.map(val => (
              <option key={val} value={val} selected={val === value}>
                {val}
              </option>
            ))}
          </select>
          <button onClick={this.onClick}>Submit</button>
        </div>
      </div>
    );
  }
}
