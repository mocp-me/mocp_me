import React from 'react';

import './nav_panel.css';

const NavPanel = ({imgSrc, text, onClick, btnText}) => 
    <div className="panel-wrapper">
        <img src={imgSrc} />
        <p>{text}</p>
        <button onClick={onClick}>{btnText}</button>
    </div>;

export default NavPanel;

