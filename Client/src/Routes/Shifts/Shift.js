import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as utils from '../../utils/date-utils';
import { shiftActions } from '../../actions';

import '../../css/Shifts.scss';

class Shift extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sunday: utils.getSunday(new Date()),
      weekNumber: 0,
      selected: [],
      days: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ],
      shifts: ['morning', 'evening']
    };

    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showShiftButton = this.showShiftButton.bind(this);
    this.deleteShift = this.deleteShift.bind(this);
    this.addShift = this.addShift.bind(this);
    this.removeShift = this.removeShift.bind(this);
    this.dateGreaterEqThanToday = this.dateGreaterEqThanToday.bind(this);
    this.getDate = this.getDate.bind(this);

    this.loadShifts = this.loadShifts.bind(this);
    this.loadShifts(0);
  }

  showShiftButton(shift, index) {
    if (index > 4) {
      return (<center>Weekend</center>)
    }
    const { shifts } = this.props;
    let s = null;
    for (let i = 0; i < shifts.length; ++i) {
      if (shifts[i].shift === shift && (new Date(shifts[i].date)).getDay() == index) {
        s = shifts[i];
        break;
      }
    }
    const showButton = this.dateGreaterEqThanToday(index);
    if (s) {
      const date = this.getDate(index);
      let style = {textAlign: 'center'};
      if (s.userId == this.props.user.id) {
        style = {
          textAlign: 'center',
          color: 'blue'
        };
      }
      return (
      <div style={style}>
      {s.userName} 
      {this.props.user.role === 'admin' && showButton ? 
      (<center><button onClick={(e) => this.deleteShift(shift, date, e)}>Delete</button></center>) :
       null }
      </div>
      );
    }
    if (showButton && this.props.user.role === 'worker') {
      const currentDate = utils.getSunday(new Date());
      currentDate.setDate(currentDate.getDate() + 7 * this.state.weekNumber + index);
      const date = this.getDate(index);
      for (let i = 0; i < this.state.selected.length; i++) {
        const sh = this.state.selected[i];
        const day = (new Date(sh.date)).valueOf();
        if (sh.shift == shift && day == currentDate.valueOf()) {
          return (<center><button style={{color: 'red'}} onClick={(e) => this.removeShift(shift, date, e)}>Unselect</button></center>);
        }
      }
      return (<center><button onClick={(e) => this.addShift(shift, date, e)}>{shift}</button></center>);
    }
    return (<div style={{textAlign: 'center'}}>Empty</div>);
  }

  dateGreaterEqThanToday(index) {
    const shiftDate = utils.getSunday(new Date());
    shiftDate.setDate(shiftDate.getDate() + 7 * this.state.weekNumber + index);
    const today = (new Date()).valueOf();
    return today < shiftDate;
  }

  deleteShift(shift, date, e) {
    if (this.props.user.role !== 'admin') {
      return;
    }
    const { dispatch, shifts } = this.props;
    let id = null;
    for (let i = 0; i < shifts.length; i++) {
      const s = shifts[i];
      if (s.shift === shift && (new Date(s.date)).valueOf() == date.valueOf()) {
        id = s._id;
        break;
      }
    }
    const ans = window.confirm("Are you sure you want to delete this shift ?");
    if (ans && id) dispatch(shiftActions.deleteShift(shifts, id));
  }

  addShift(shift, date, e) {
    const s = {
      shift: shift,
      date: utils.resetTime(date)
    }
    const filter = this.state.selected.filter(shi => shi.shift === s.shift && shi.date.valueOf() == s.date.valueOf());
    if (filter.length > 0) {
      return;
    }
    this.setState(prevState => ({
      selected: [...prevState.selected, s]
    }));
  }

  removeShift(shift, date, e) {
    const s = {
      shift: shift,
      date: utils.resetTime(date)
    }
    const filter = this.state.selected.filter(shi => shi.shift !== s.shift || shi.date.valueOf() != s.date.valueOf());

    this.setState({ selected: filter });
  }

  getDate(index) {
    const date = new Date(this.state.sunday);
    date.setDate(date.getDate() + index);
    return date;
  }
  
  loadShifts(week) {
    const { dispatch } = this.props;
    dispatch(shiftActions.getShifts(week));
  }

  handleNext(e) {
    e.preventDefault();
    this.setState({
      weekNumber: this.state.weekNumber + 1,
      sunday: utils.getSunday(this.state.sunday.setDate(this.state.sunday.getDate() + 7))
    });
    this.loadShifts(this.state.weekNumber + 1);
  }

  handlePrev(e) {
    e.preventDefault();
    this.setState({
      weekNumber: this.state.weekNumber - 1,
      sunday: utils.getSunday(this.state.sunday.setDate(this.state.sunday.getDate() - 7))
    });
    this.loadShifts(this.state.weekNumber - 1);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.selected.length == 0) {
      return;
    }
    const { dispatch } = this.props;
    dispatch(shiftActions.createShifts(this.props.shifts, this.state.selected, this.props.user));
  }

  render() {
    const { shifts } = this.props;
    const dates = [];
    for (let i = 0; i < 7; i++) {
    const sunday = new Date(this.state.sunday);
      dates.push(<th key={i} style={{textAlign: 'center'}}>{utils.formatDate(sunday.setDate(sunday.getDate() + i))}</th>)
    }
    const headers = this.state.days.map((day, index) => {
      return <td key={index} style={{textAlign: 'center'}}>{day}</td>;
    });

    const table = this.state.shifts.map((shift, index) => {
      return (
        <tr key={index}>
          {this.state.days.map((day, index2) => {
            return (
              <td
                key={index2}
                onClick={() =>
                  this.setState({ shift: { id: '', shift: shift, date: day } })
                }
              >
                <div>
                  {shifts ? this.showShiftButton(shift, index2) : (<center>Loading...</center>) }
                </div>
              </td>
            );
          })}
        </tr>
      );
    });

    const nextButton = (
            <button className="login100-form-btn" style={{marginTop: 'auto', marginLeft: 'auto'}} onClick={this.handleNext}>
              Next
            </button>);
    const prevButton = (
      <button className="login100-form-btn" style={{marginTop: 'auto'}} onClick={this.handlePrev}>
        Prev
      </button>);
    const submitButton = (
      <button className="login100-form-btn" style={{marginBottom: 'auto'}} onClick={this.handleSubmit}>
        Submit
      </button>
    );
    return (
      <div className="Shifts">
        <div className="container-login100">
          {prevButton}
          {nextButton}
          <table>
            <tbody>
              {dates}
              <tr>{headers}</tr>
              {table}
            </tbody>
          </table>
          {this.props.message ? <center><div id="success-msg" style={{marginTop: 'auto'}}>{this.props.message.message}</div></center> : null}
          {this.props.error ? <center><div id="invalid-input" style={{marginTop: 'auto'}}>{this.props.error}</div></center> : null}
          {this.props.user.role === 'worker' ? submitButton : null}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
    const { error, message } = state.alert;
    const { items } = state.shifts;
    const { user } = state.authentication;
    return {
        message: message,
        error: error,
        shifts: items,
        user: user
    };
}

const connectedShift = connect(mapStateToProps)(Shift);
export { connectedShift as Shift }; 
