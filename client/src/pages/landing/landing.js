import React from 'react';

import Logo from '../../components/logo/logo';
import Phone from '../../components/phone/phone';
import NavPanel from '../../components/nav_panel/nav_panel';

import {Grid, Row, Col, Container, Clearfix} from 'react-grid-system';
// import styled from 'styled-components';

// import './landing.css';

const landingWrapper = {
    background:'black'
}


const Landing = () => 
    <div style={landingWrapper}>

        <Row>
            <Col xs={12} sm={8} md={7}>
                <Logo />
                <Phone />
            </Col>
            <Col xs={12} sm={4} md={5}>
                <NavPanel
                    imgSrc="https://picsum.photos/300/300?random"
                    text="Upload your image to connect to the collection."
                    //route will eventually be passed to a Link to="{route}" in nav_panel
                    route="/add"
                    btnText='add image'
                    backgroundColor='#FFDC65'
                />
                <NavPanel
                    imgSrc="https://picsum.photos/300/301?random"
                    text="Search our tags & add some more on the go!"
                    route="/explore"
                    btnText='explore'
                    backgroundColor='#E5B616'
                />
            </Col>
        </Row>
    </div>


export default Landing;