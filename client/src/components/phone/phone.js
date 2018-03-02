import React, { Component } from 'react';
import ClassNames from 'classnames';
import autoBind from 'auto-bind';

class Phone extends Component {
    constructor(props){
        super(props);

        autoBind(this);

        this.state = {
            animate: this.props.animate
        }
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
        const phoneClass = ClassNames({
            'phoneWrapper': true,
            'phoneWrapperHover': this.state.animate
        });
        return (
            <div className="transformContainer" onMouseOver={ this.handleOnMouseOver } onMouseLeave={ this.handleOnMouseLeave }>
                <div className={ phoneClass }> 
                    <div className="speakerCircle"></div>
                    <div className="speaker">
                        <div className="cameraCircle"></div>
                    </div>                
                    { !this.state.animate ? 
                    <div className="phone">
                        Let's tag the collection with machine learning & computer vision.
                    </div> : 
                    <div className ="aboutWrapper">
                        <p><b>MoCP.me</b> is a web application using computer vision and machine learning as a way to interact with the collection on user-generated terms.</p>
                    </div> }
                    <div className="line"><b>2018</b></div>
                    <div className="credits"><b>
                        <p>Amanda Yamasaki</p>
                        <p>Lane Anderson</p>
                        <p>Michael Doherty</p>
                        <p>Dennis Hodges</p></b>
                    </div>
                </div>
            </div>
        );
    }
}

export default Phone;


 