import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {Grid, Row, Col, Container} from 'react-grid-system';
import ClassNames from 'classnames';



class NavPanel extends Component {
    constructor(props){
        super(props);
        this.state = {hovered: false}
    }

    handleOnMouseOver = () => {
        this.setState({hovered:true})
    }
    handleOnMouseLeave = () => {
        this.setState({hovered:false})
    }

    render() {
		var animationClass = ClassNames({
		    'animationWrapper': true,
		    'animationWapperHovered': this.state.hovered
		});
		return (
		    <Row className="panelStyle" onMouseOver={this.handleOnMouseOver} onMouseLeave={this.handleOnMouseLeave}>
		    	<Col xs={12} className={animationClass}>
		    		<div className="frame">
		    			<div className="extra_1"></div>
		    			<div className="extra_2">
		    				<div className="extra_2_2"></div>
		    			</div>
				    	<div className="textWrapper">
					        <p className="textStyle"><b>{this.props.text1}</b></p>
					        <p className="textStyle"><b>{this.props.text2}</b></p>
					        <p className="textStyle"><b>{this.props.text3}</b></p>
						</div>
						<div className="extra_3"></div>
						<div className="extra_4"></div>
					</div>
			    </Col>
		    </Row>
	   	)
    }
}

export default NavPanel;
