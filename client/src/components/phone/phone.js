import React, { Component } from 'react';

import About from '../about/about';

import './phone.css';


class Phone extends Component {
    constructor(props){
        super(props);
        this.state = {clicked: false}
    }

    render() {
        return (
            //probably a better way to do this, and onhover should work about the same, but basically if clicked is false, set to true and rerender n vice versa
            <div className='phone-wrapper'  onClick={()=>this.state.clicked ? this.setState({clicked: false}) : this.setState({clicked: true})}>                
                {/* determine what to render based on state */}
                {!this.state.clicked ? <div className="phone">The phone will go here</div> : <About /> }
            </div>
        )
    }
}

export default Phone;


