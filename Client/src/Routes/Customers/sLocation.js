import React, { Component } from "react";
import { connect } from "react-redux";
class sLocation extends Component {
  render() {
    return (
      <div className="container-login100">
        <h3>Adress </h3>
        <div>
          <h4>: David ha-Re'uveni St 25, Be'er Sheva, Israel</h4>
        </div>

        <img src="https://cascade.madmimi.com/promotion_images/2120/8750/original/Screenshot_beersheva_25_beis_midrash.jpg?1503575695" />
      </div>
    );
  }
}

export default sLocation;

const connectedLoc = connect(sLocation);
export { connectedLoc as sLocation };
