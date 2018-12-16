import React, { Component } from 'react';

import '../../css/Shifts.scss';

class Shift extends Component {
  state = {
    shift: {
      shift: '',
      date: ''
    },
    days: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ],
    shifts: ['morning', 'evening'],
    selected: [
      { shift: 'morning', date: 'Sunday' },
      { shift: 'evening', date: 'Friday' }
    ]
  };

  render() {
    const headers = this.state.days.map((day, index) => {
      return <th key={index}>{day}</th>;
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
                  {this.state.selected.some(
                    obj => obj.shift === shift && obj.date == day
                  ) ? (
                    <h3>Taken </h3>
                  ) : (
                    <button>{shift}</button>
                  )}
                </div>
              </td>
            );
          })}
        </tr>
      );
    });

    return (
      <div className="Shifts">
        <div className="container-login100">
          <table>
            <tbody>
              {headers}
              {table}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Shift;
