import React from 'react';
import '../../css/navbar.css';

export default function AdminMenu() {
  return (
    <div className="dropdown">
      <a className="dropbtn">Menu</a>
      <div className="dropdown-content">

        <a href="/personalInfo">Personal Info</a>
        <a href="/workers">Workers</a>
        <a href="/addWorker">Add Worker</a>
        <a href="/deleteWorker">Delete Worker</a>
        <a href="/rateList">Workers Rates</a>
        <a href="./Shifts">Shifts</a>
        <a href="/products">Products</a>
        <a href="/addProduct">Add Product</a>
        <a href="/customers">Customers</a>
        <a href="/addCustomer">Add Customers</a>
        <a href="/searchCustomer">Search Customer</a>
        <a href='/salary'>Salary</a>
        
      </div>
    </div>
  );
}
