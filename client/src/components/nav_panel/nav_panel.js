import React from 'react';
import {Link} from 'react-router-dom'
import {Grid, Row, Col, Container} from 'react-grid-system';

const panelStyle={
	alignContent:'center',
	textAlign:'center',
	height:'50vh',
	paddingTop:'2vh',
}
const imageStyle={
	marginBottom:'2vh',
	height:'25vh'
}
const textStyle={
	font:"avenir",
	marginBottom:'.25vh',
	fontSize:'2.5vh',
	padding:'none',
	lineHeight:'1.25'
}

const NavPanel = ({children, imgSrc, text1, text2, text3, route, onClick, btnText, style, buttonStyleProp}) => 
    <Row style={style}>
    	<Col xs={12}>
	        <img style={imageStyle} src={imgSrc}/>
	        <p style={textStyle}><b>{text1}</b></p>
	        <p style={textStyle}><b>{text2}</b></p>
	        <p style={textStyle}><b>{text3}</b></p>
			{children}
	    </Col>
    </Row>

export default NavPanel;
