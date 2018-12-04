import React from 'react';
import '../../css/navbar.css'

export default function AdminMenu(){
    return(
    <div className="dropdown">
     <a class="dropbtn">Menu</a>
        <div className="dropdown-content">
          <a>Products</a>
          <a href='/addWorker'>Add Worker</a>
          <a href='/deleteWorker'>Delete Worker</a>
          <a href='/addCustomer'>Add Customers</a>
          <a>Search Customer</a>
          <a>Personal Info</a>
          <a>Salary</a>
          <a>Shifts</a>

        </div>
    </div>
    )
}