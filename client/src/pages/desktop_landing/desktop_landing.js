import React from 'react';

import Logo from '../../components/logo/logo';
import Phone from '../../components/phone/phone';
import NavPanel from '../../components/nav_panel/nav_panel';

import './desktop_landing.css';

const  DesktopLanding = () => 
    <div className="landing-wrapper">
        <Logo />
        <Phone />
        <NavPanel
            imgSrc="https://picsum.photos/300/300?random"
            text="Upload your image to connect to the collection."
            //route will eventually be passed to a Link to="{route}" in nav_panel
            route="/add"
            btnText='add image'
        />
        <NavPanel
            imgSrc="https://picsum.photos/300/301?random"
            text="Search our tags & add some more on the go!"
            route="/explore"
            btnText='explore'
        />
    </div>


export default DesktopLanding;