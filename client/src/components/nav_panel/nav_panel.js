import React from 'react';
import {Link} from 'react-router-dom'
import {Grid, Row, Col, Container} from 'react-grid-system';


const NavPanel = ({children, imgSrc, text1, text2, text3, route, onClick, btnText}) => 
    <Row className="panelStyle">
    	<Col xs={12}>
	        <img className="imageStyle" src={imgSrc}/>
	        <p className="textStyle"><b>{text1}</b></p>
	        <p className="textStyle"><b>{text2}</b></p>
	        <p className="textStyle"><b>{text3}</b></p>
			{children}
	    </Col>
    </Row>

export default NavPanel;
