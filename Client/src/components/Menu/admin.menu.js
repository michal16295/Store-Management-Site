import React from 'react';
import '../../css/navbar.css'

export default function AdminMenu(){
    return(
    <div className="dropdown">
     <a class="dropbtn">Menu</a>
        <div className="dropdown-content">
             <a href='/about'>Menu 2</a>
        </div>
    </div>
    )
}