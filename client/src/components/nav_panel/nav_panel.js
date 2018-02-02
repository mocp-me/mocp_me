import React from 'react';
import {Link} from 'react-router-dom'
import {Grid, Row, Col, Container} from 'react-grid-system';

const panelStyle={
	alignContent:'center',
	textAlign:'center'
}

const NavPanel = ({imgSrc, text, route, onClick, btnText, backgroundColor}) => 
    <Row>
    	<Col xs={12} style={panelStyle}>
	        <img src={imgSrc}/>
	        <p>{text}</p>
	        <Link to={route}>
	            <button onClick={onClick}>{btnText}</button>
	        </Link>
	    </Col>
    </Row>

export default NavPanel;
