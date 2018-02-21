import React from 'react';
import { Link } from 'react-router-dom';

const NavBtn = (props) => {
    return (
        <Link to={props.route}>
            <button className="backButton">{props.btnText}</button>
        </Link>
    )
}

 export default NavBtn; 