import React from 'react';

import Logo from '../../components/logo/logo';
import Phone from '../../components/phone/phone';
import NavPanel from '../../components/nav_panel/nav_panel';

import {Grid, Row, Col, Container, Clearfix} from 'react-grid-system';
// import styled from 'styled-components';

// import './landing.css';

const landingWrapper = {
    background:'black',
    height:'100vh',
    overflowY:'none'
}
const navPanel_1 = {
    backgroundColor: '#FFDC65',
    color:'#E5B616',
}
const navPanel_2 = {
    backgroundColor: '#E5B616',
    color:'#FFDC65',
}
const butt_1 = {
    background:'none',
    borderColor:'#E5B616',
    color:'#E5B616',
    borderRadius:'25px',
    borderWidth:'1.5px',
    paddingLeft:'20px',
    paddingRight:'18px',
    paddingTop:'10px',
    paddingBottom:'10px',
    marginTop:'10px'
}
const butt_2 = {
    background:'none',
    borderColor:'#FFDC65',
    color:'#FFDC65',
    borderRadius:'25px',
    borderWidth:'1.5px',
    paddingLeft:'20px',
    paddingRight:'18px',
    paddingTop:'10px',
    paddingBottom:'10px',
    marginTop:'10px'
}

const Landing = () => 
    <div style={landingWrapper}>

        <Row>
            <Col xs={12} sm={8} md={7}>
                <Logo />
                <Phone />
            </Col>
            <Col xs={12} sm={4} md={5}>
                <NavPanel style={ navPanel_1}
                    imgSrc="https://picsum.photos/190/190?random"
                    text1="Upload your image"
                    text2="to connect to"
                    text3="the collection."
                    route="/upload"
                    btnText='add image'
                    style={ navPanel_1 }
                    buttonStyleProp = { butt_1 }
                />
                <NavPanel
                    imgSrc="https://picsum.photos/190/190?random"
                    text1="Search our tags"
                    text2="& add some more"
                    text3="on the go!"
                    route="/explore"
                    btnText='explore'
                    style={navPanel_2}
                    buttonStyleProp = { butt_2 }
                />
            </Col>
        </Row>
    </div>


export default Landing;