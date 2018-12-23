import React from 'react';
import '../../css/navbar.css';

export default function AdminMenu() {
  return (
    <div className="dropdown">
      <a className="dropbtn">Menu</a>
      <div className="dropdown-content">
        <a href="/workers">Workers</a>
        <a href="/addProduct">Add Product</a>
        <a href="/products">Products</a>
        <a href="/addWorker">Add Worker</a>
        <a href="/deleteWorker">Delete Worker</a>
        <a href="/addCustomer">Add Customers</a>
        <a>Search Customer</a>
        <a href="/AboutMe">Personal Info</a>
        <a>Salary</a>
        <a href="./Shifts">Shifts</a>
      </div>
    </div>
  );
}
