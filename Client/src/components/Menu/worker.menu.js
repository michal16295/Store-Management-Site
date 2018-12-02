import React from 'react';
import '../../css/navbar.css'

export default function WorkerMenu(){
    return(
    <div className="dropdown">
     <a class="dropbtn">Menu</a>
        <div className="dropdown-content">
          <a>Menu 2</a>
        </div>
    </div>
    )
}