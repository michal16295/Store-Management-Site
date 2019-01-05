import React from "react";
import "../../css/navbar.css";

export default function CustomerMenu() {
  return (
    <div className="dropdown">
      <a class="dropbtn">Menu</a>

      <div className="dropdown-content">
      <a href="/personalInfo">Personal Info</a>
        <a href="/RateWorkers">Workers</a>
        <a href="/products">Products</a>
        <a href="/referralCustomers">Customers Brought</a>
        <a href="/sLocation">Our Location</a>
      </div>
    </div>
  );
}
