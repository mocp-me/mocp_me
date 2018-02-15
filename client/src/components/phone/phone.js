import React, { Component } from 'react';
import About from '../about/about';
import {Grid, Row, Col, Container} from 'react-grid-system';

// import './phone.css';


class Phone extends Component {
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
        return (
            <div className="phoneWrapper"  onMouseOver={this.handleOnMouseOver} onMouseLeave={this.handleOnMouseLeave}>                
                {!this.state.hovered ? <div className="phone">Tag the collection with machine learning & computer vision</div> : <About /> }
            </div>
        )
    }
}

export default Phone;


