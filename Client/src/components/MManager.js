import React, { Component } from "react";

class MManager extends Component {
  render() {
    return (
      <div>
        <div>
          <button>Show Worker Card</button>
        </div>
        <div>
          {" "}
          <button>Show Costumer Card</button>
        </div>
        <div>
          {" "}
          <button>Show Manager Card</button>
        </div>
        <div>
          {" "}
          <button>Show Products</button>
        </div>
        <div>
          {" "}
          <button>Show Shifts</button>
        </div>
        <div>
          {" "}
          <button>Add new costumer</button>
        </div>
        <div>
          {" "}
          <button>Show workers reviews</button>
        </div>
      </div>
    );
  }
}

//ReactDOM.render(<mainMenuClient />, document.getElementById("root"));
export default MManager;
// Learn more about service workers: http://bit.ly/CRA-PWA
