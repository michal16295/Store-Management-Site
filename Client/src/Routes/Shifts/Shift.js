import React, { Component } from 'react';

import '../../css/Shifts.scss';

class Shift extends Component {
  state = {
    shift: {
      id: '',
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
    shifts: ['Morning', 'Evening']
  };

  render() {
    const table = this.state.shifts.map((shift, index) => {
      return (
        <tr key={index}>
          {this.state.days.map((day, index2) => {
            return (
              <td
                key={index2}
                onClick={event =>
                  this.setState({ shift: { id: '', shift: shift, date: day } })
                }
              >
                <div>{day}</div>
                <div>{shift}</div>
                <div>
                  <button>Sign in</button>
                </div>
              </td>
            );
          })}
        </tr>
      );
    });

    return (
      <div className="Shifts">
        <table>
          <tbody>{table}</tbody>
        </table>
      </div>
    );
  }
}

export default Shift;
