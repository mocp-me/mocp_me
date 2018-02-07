import React, { Component } from 'react';
import { Grid, Row, Col, Container } from 'react-grid-system';

const style={
	background:'#404040',
	width:'100%',
	marginLeft:'0px',
	marginBottom:'5px',
	color:'white',
	padding:'10px',
	borderRadius:'25px',
	font:'avenir',
	paddingLeft:'20px',
	paddingRight:'20px',
}
const btnStyle={
	borderRadius:'25px',
	marginRight:'10px',
	background:'none',
	color:'white',
	borderWidth:'2px',
	width:'60px',
	textAlign:'center'
}

const AdminContent = ({tagName, datePosted}) => 
	<Row style={ style }>
		<Col xs={4}>
			{ tagName }
		</Col>
		<Col xs={4}>
			{ datePosted }
		</Col>
		<Col xs={4}>
			<button style={ btnStyle }>
                yes
            </button> 
			<button style={ btnStyle }>
                no
            </button> 
		</Col>
	</Row>

export default AdminContent;