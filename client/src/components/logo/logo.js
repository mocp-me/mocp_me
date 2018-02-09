import React from 'react';
import logo from './logo.png'
import Media from "react-media";

// import './logo.css';
const logoStyleSm = {
	width:'272px',
	marginTop:'7vh',
	marginBottom:'5vh',
	marginLeft: '9vw'
}
const logoStyleLg = {
	width:'272px',
	marginTop:'7vh',
	marginBottom:'5vh',
	marginLeft: '16vw'
}

const Logo = () => 
    <div className="logo-wrapper">
    	<Media query="(max-width: 800px)">
          {matches =>
            matches ? (
              <img className='logo' src={ logo } style={ logoStyleSm } />
            ) : (
              <img className='logo' src={ logo } style={ logoStyleLg } />
            )
          }
        </Media>
    </div>;

export default Logo;

