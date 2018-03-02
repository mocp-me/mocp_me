import React, { Component } from 'react';
import { Row, Col } from 'react-grid-system';
import ClassNames from 'classnames';
import autoBind from 'auto-bind';

class NavPanel extends Component {
    constructor(props){
        super(props);

        autoBind(this);

        this.state = {
        	animate: this.props.animate
        };
    }

    componentWillReceiveProps(props){
        this.setState({animate : props.animate});
    }

    handleOnMouseOver() {
        this.setState({ animate:true });
    }
    handleOnMouseLeave() {
        this.setState({ animate:false });
    }

    render() {
		const animationClass = ClassNames({
		    'animationWrapper': true,
		    'animationWapperHovered': this.state.animate
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
	   	);
    }
}

export default NavPanel;
