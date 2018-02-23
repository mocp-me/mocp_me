import React, { Component } from 'react';
import {Grid, Row, Col, Container} from 'react-grid-system';
import ClassNames from 'classnames';
// import './phone.css';


class Phone extends Component {
    constructor(props){
        super(props);

        // console.log(this.props);
        this.state = {
            hovered: false,
            phone:false,
            // trigger:this.props
            trigger:false
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
      this.updateWindowDimensions();
      window.addEventListener('resize', this.updateWindowDimensions);
      window.addEventListener('scroll', this.handleScroll);
      // this.setState({triggerOne:props.triggerOne});
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.updateWindowDimensions);
      window.removeEventListener('scroll', this.handleScroll);
    }

    updateWindowDimensions() {
        if (window.innerWidth < 450){
            this.setState({phone:true});
        } else {
            this.setState({phone:false});
        }
    }

    handleScroll(event){
        if (this.state.trigger !== this.props){
            this.setState({trigger:this.props});
            console.log(this.state.trigger);
            if (this.state.trigger){
                this.setState({hovered:true});
            } else {
                this.setState({hovered:false});
            }
        }
    }

    handleOnMouseOver = () => {
        if (this.state.phone){
            this.setState({hovered:false})
        } else {
            this.setState({hovered:true});
        }
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
                    <div className="line"><b>2018</b></div>
                    <div className="credits"><b>
                        <p>Amanda Yamasaki</p>
                        <p>Lane Anderson</p>
                        <p>Michael Doherty</p>
                        <p>Dennis Hodges</p></b>
                    </div>
                </div>
            </div>
        )
    }
}

export default Phone;


 