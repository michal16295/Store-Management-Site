import React from 'react';
import '../../css/navbar.css';

export default function WorkerMenu() {
  return (
    <div className="dropdown">
      <a class="dropbtn">Menu</a>
      <div className="dropdown-content">
        <a>Products</a>
        <a>Workers</a>
        <a href="/addCustomer">Add Customers</a>
        <a>Find Customer</a>
        <a href="./Shifts">Shifts</a>
        <a href="/AboutMe">Personal Info</a>
      </div>
    </div>
  );
}
