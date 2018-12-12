import React from 'react';
import '../../css/navbar.css';

export default function CustomerMenu() {
  return (
    <div className="dropdown">
      <a class="dropbtn">Menu</a>
      <div className="dropdown-content">
        <a>Products</a>
        <a>Workers</a>
        <a href="/AboutMe">Personal Info</a>
        <a>Our Location</a>
      </div>
    </div>
  );
}
