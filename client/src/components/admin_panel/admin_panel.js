import React, { Component } from "react";
import { Grid, Row, Col, Container } from "react-grid-system";
import ReactCSSTransitionGroup from "react-addons-css-transition-group"; 


import logo from "../logo/logo.png";
import AdminContent from "./admin_content/admin_content";
import moment from "moment";
import Axios from "axios";

import "./style.css";

const pageStyle = {
	font:"avenir"
}
const jumboStyle = {
	background:"#FFDC65",
	borderRadius:"25px",
	padding:"30px",
	paddingTop:"50px",
	paddingBottom:"40px",
	margin:"20px",
	font:"avenir"
}
const logoStyle = {
	width:"100%"
}
const adminStyle={
	borderRadius:"25px",
	padding:"10px",
	marginTop:"15px",
	background:"white",
	paddingLeft:"13px",
	color:"#FFDC65",
}
const headStyle = {
	background:"black",
	margin:"20px 20px 5px 20px",
	color:"#eaeaea",
	padding:"10px",
	borderRadius:"25px",
	font:"avenir",
	paddingLeft:"20px",
	paddingRight:"20px",
}

const imgStyle = {
	padding:"10px"
}

// retrieve Javascript Web Token from localStorage
const token = `Bearer ${localStorage.getItem("access_token")}`;

// instantiate and configure axios
let axios = Axios.create({
	baseURL: "/admin",
	timeout: 5000,
	headers: {
		"Authorization": token,
		"crossDomain": true
	}
});


class AdminPanel extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tags: []
		}
	}

	componentWillMount() {
		axios.get("pending-tags").then(response => {
			console.log('response', response);
			let tagArray = response.data;
			this.setState({tags: tagArray})
			console.log("this.state", this.state);
		});
	}

	removeTheThing(tagId) {
		const { tags } = this.state;
		this.setState({
			tags: tags.filter(tag => tag.id !== tagId)
		})
	}

	approveTag(tagId) {
		axios.put(`/approval/${tagId}`)
			.then(response => console.log(response))
			.catch(err => console.log(err));
		this.removeTheThing(tagId);
		return console.log(`approveTag(${tagId}) called.`);

	}

	rejectTag(tagId) {
		axios.delete(`/delete/${tagId}`)
			.then(response => console.log(response))
			.catch(err => console.log(err));		
		this.removeTheThing(tagId);
		return console.log(`rejectTag(${tagId}) called.`);
	}


  render() {
  	console.log("this.state.tags", this.state.tags);
	const tagList = this.state.tags && this.state.tags.map((tag, i) => {
		return (


			<div>
				<a href={`#accordion-content-${i}`} data-toggle="collapse">
					<AdminContent
						key={tag.tag_name}
						tagName={tag.tag_name}
						datePosted={moment(tag.createdAt).format("LLL")}
						onApprove={() => {
							this.approveTag(tag.id)}}
						onReject={() => {
							this.rejectTag(tag.id)}}
					/>
				</a>
				<div id={`accordion-content-${i}`} className="collapse hide">
					<img src={tag.Photo ? tag.Photo.web_path : null} style={imgStyle }/>
				</div>
			</div>


		)
	});

    return (
      <Container style={ pageStyle }>
    	<Row style={ jumboStyle }>
    		<Col md= { 7 } lg= { 4 }>
    			<img className='logo' src={logo} style={logoStyle} />
    		</Col>
    		<Col md= { 5 } lg= { 4 } style={{textAlign:'center'}}>
    			<h2 style={ adminStyle }>admin page</h2>
    		</Col>
    	</Row>
    	<Row style={ headStyle }>
			<Col xs={ 4 }>
				<b>Tag:</b>
			</Col>
			<Col xs={ 4 }>
				<b>Date Posted:</b>
			</Col>
			<Col xs={ 4 }>
				<b>Approve:</b>
			</Col>
		</Row>
    	<Row style={{marginLeft:'20px', marginRight:'20px'}}>
			<ReactCSSTransitionGroup
				transitionName="example"
				transitionEnterTimeout={500}
				transitionLeaveTimeout={300}
				style={{width: '100%'}}>
				<div id="accordion" className="text-center">
					{ tagList }
				</div>
			</ReactCSSTransitionGroup>
    	</Row>
      </Container>
    );
  }
}

export default AdminPanel;