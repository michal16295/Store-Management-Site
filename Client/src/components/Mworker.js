import React, { Component } from "react";

class Mworker extends Component {
  render() {
    return (
      <div>
        <div>
          {" "}
          <button>Show Worker Card</button>
        </div>
        <div>
          <button>Show Costumer Card</button>
        </div>

        <div>
          <button>Show Products</button>
        </div>

        <div>
          <button>Show Shifts</button>
        </div>

        <div>
          <button>Add new costumer</button>
        </div>

        <div>
          <button>Print salary</button>
        </div>
      </div>
    );
  }
}

//ReactDOM.render(<mainMenuClient />, document.getElementById("root"));
export default Mworker;
// Learn more about service workers: http://bit.ly/CRA-PWA
