import React, { Component } from "react";

class Mclient extends Component {
  render() {
    return (
      <div>
        <div>
          <button>Show Customer Card</button>
        </div>

        <div>
          <button>Show Products</button>
        </div>

        <div>
          <button>Contact us</button>
        </div>

        <div>
          <button>Show worker list</button>
        </div>

        <div>
          <button>Show our location</button>
        </div>
      </div>
    );
  }
}

//ReactDOM.render(<mainMenuClient />, document.getElementById("root"));
export default Mclient;
// Learn more about service workers: http://bit.ly/CRA-PWA
