import React, { Component } from 'react';

import About from '../about/about';

import './phone.css';


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
            //probably a better way to do this, and onhover should work about the same, but basically if hovered is false, set to true and rerender n vice versa
            <div className='phone-wrapper'  onMouseOver={this.handleOnMouseOver} onMouseLeave={this.handleOnMouseLeave}>                
                {/* determine what to render based on state */}
                {!this.state.hovered ? <div className="phone">Tag the Collection with machine learning & computer vision</div> : <About /> }
            </div>
        )
    }
}

export default Phone;


