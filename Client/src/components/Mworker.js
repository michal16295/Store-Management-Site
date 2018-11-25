import React, { Component } from "react";

class Mworker extends Component {
  render() {
    return (
      <div>
        <button>Show Worker Card</button>
        <button>Show Costumer Card</button>
        <br />
        <button>Show Products</button>
        <br />
        <button>Show Shifts</button>

        <button>Add new costumer</button>
        <br />
        <button>Print salary</button>
        <br />
      </div>
    );
  }
}

//ReactDOM.render(<mainMenuClient />, document.getElementById("root"));
export default Mworker;
// Learn more about service workers: http://bit.ly/CRA-PWA
