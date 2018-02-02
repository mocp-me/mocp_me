import React from 'react';
import logo from './logo.png'

// import './logo.css';
const logoStyle = {
	width:'272px',
	marginLeft: '15vw',
	marginTop:'7vh',
	marginBottom:'5vh'
}

const Logo = () => 
    <div className="logo-wrapper">
        <img className='logo' src={logo} style={logoStyle} />
    </div>;

export default Logo;

