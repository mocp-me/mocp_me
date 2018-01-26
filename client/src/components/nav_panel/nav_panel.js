import React from 'react';
import {Link} from 'react-router-dom'

import './nav_panel.css';

const NavPanel = ({imgSrc, text, route, onClick, btnText}) => 
    <div className="panel-wrapper">
        <img src={imgSrc}/>
        <p>{text}</p>
        <Link to={route}>
            <button onClick={onClick}>{btnText}</button>
        </Link>
    </div>

export default NavPanel;
