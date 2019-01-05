import React from 'react';
import '../../css/navbar.css';

export default function WorkerMenu() {
  return (
    <div className="dropdown">
      <a class="dropbtn">Menu</a>
      <div className="dropdown-content">

      <a href="/personalInfo">Personal Info</a>
      <a href="/products">Products</a>
      <a href="/addProduct">Add Product</a>
      <a href="/workers">Workers</a>
      <a href="/customers">Customers</a>
      <a href="/addCustomer">Add Customers</a>
      <a href="searchCustomer">Search Customer</a>
      <a href="./Shifts">Shifts</a>
      </div>
    </div>
  );
}
