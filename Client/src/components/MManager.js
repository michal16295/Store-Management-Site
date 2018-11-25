import React, { Component } from "react";

class MManager extends Component {
  render() {
    return (
      <div>
        <br>
          <button>Show Worker Card</button>
        </br>
        <button>Show Costumer Card</button>
        <br />
        <button>Show Manager Card</button>
        <br />
        <button>Show Products</button>
        <br />
        <button>Show Shifts</button>

        <button>Add new costumer</button>
        <br />
        <button>Show workers list</button>
        <br />
        <button>Show workers reviews</button>
        <br />
      </div>
    );
  }
}

//ReactDOM.render(<mainMenuClient />, document.getElementById("root"));
export default MManager;
// Learn more about service workers: http://bit.ly/CRA-PWA
