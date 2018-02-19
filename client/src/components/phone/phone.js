import React, { Component } from 'react';
import {Grid, Row, Col, Container} from 'react-grid-system';
import ClassNames from 'classnames';
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
        var phoneClass = ClassNames({
            'phoneWrapper': true,
            'phoneWrapperHover': this.state.hovered
        });
        return (
            <div className="transformContainer" onMouseOver={this.handleOnMouseOver} onMouseLeave={this.handleOnMouseLeave}>
                <div className={phoneClass}> 
                    <div className="speakerCircle"></div>
                    <div className="speaker">
                        <div className="cameraCircle"></div>
                    </div>                
                    {!this.state.hovered ? 
                    <div className="phone">
                        Let's tag the collection with machine learning & computer vision.
                    </div> : 
                    <div className ="aboutWrapper">
                        <p><b>MoCP.me</b> is a web application using computer vision and machine learning as a way to interact with the collection on user-generated terms.</p>
                    </div> }
                    <div className="line">2018</div>
                    <div className="credits"><b>
                        <p>Amanda Yamasaki</p>
                        <p>Lane Anderson</p>
                        <p>Michael Doherty</p>
                        <p>Dennis Hodges</p>
                        <p>Jan Tichy</p></b>
                    </div>
                </div>
            </div>
        )
    }
}

export default Phone;


 