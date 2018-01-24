import React from 'react';

import Logo from '../../components/logo/logo';
import Phone from '../../components/phone/phone';

//we'll make a different Phone component for mobile I think, since it won't be tracking 'onHover' state, its probs best to make a dif one
//but for now, just testing conditional rendering n stuffffff

const  MobileLanding = () => 
    <div className="mobile-landing-wrapper">
        <Logo />
        <Phone />
    </div>


export default MobileLanding;