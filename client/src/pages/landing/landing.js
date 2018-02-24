import React, { ReactDOM, Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Dropzone from "react-dropzone";
import Waypoint from 'react-waypoint';
import { Grid, Row, Col, Container, Clearfix } from "react-grid-system"
import axios from "axios";

import Logo from "../../components/logo/logo";
import Phone from "../../components/phone/phone";
import NavPanel from "../../components/nav_panel/nav_panel";

class Landing extends Component {
    constructor(props) {
        super(props);

        this.onDrop = this.onDrop.bind(this);
        this.onDragEnter = this.onDragEnter.bind(this);
        this.onDragLeave = this.onDragLeave.bind(this);
        this.handleTriggerOneEnter = this.handleTriggerOneEnter.bind(this);
        this.handleTriggerOneLeave = this.handleTriggerOneLeave.bind(this);  
        this.handleTriggerTwoEnter = this.handleTriggerTwoEnter.bind(this);
        this.handleTriggerTwoLeave = this.handleTriggerTwoLeave.bind(this);
        this.handleTriggerThreeEnter = this.handleTriggerThreeEnter.bind(this);
        this.handleTriggerThreeLeave = this.handleTriggerThreeLeave.bind(this);

        this.state = {
            dropzoneActive: false,
            rejectedFile: false,
            triggerOne: false,
            triggerTwo: false,
            triggerThree: false 
        }
    }
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }
    
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    onDragEnter() {
        this.setState({ dropzoneActive: true });
    }

    onDragLeave() {
            this.setState({ dropzoneActive: false });
    }

    onDrop(accepted, rejected) {
        if(rejected.length > 0) {
            this.setState({ fileRejected: true });
            return;
        } else {
            this.setState({ 
                dropzoneActive: false,
                fileUploaded: true,
             });
        }

        const image = new FormData();
        image.append("image", accepted[0]);

        axios
            .post("/api/upload", image)
            .then(res => {
                sessionStorage.setItem("uploadedImg", JSON.stringify(res.data.imageUrl));
                this.props.history.push("/vision_search");})
            .catch(err => console.log(err));
    }

    handleTriggerOneEnter() {
        console.log('hi')
        this.setState({ triggerOne: true });
    }
    handleTriggerOneLeave() {
        console.log('hi')
        this.setState({ triggerOne: false });
    }

    handleTriggerTwoEnter() {
        console.log('hi')
        this.setState({ triggerTwo: true });
    }
    handleTriggerTwoLeave() {
        console.log('bye')
        this.setState({ triggerTwo: false });
    }

    handleTriggerThreeEnter() {
        console.log('hi')
        this.setState({ triggerThree: true });
    }
    handleTriggerThreeLeave() {
        console.log('hi')
        this.setState({ triggerThree: false });
    }

    render() {

        const { dropzoneActive } = this.state;

        const overlayStyle = {
            position: "fixed",
            top: 0,
            left: 0,
            height:"100vh",
            width:"100vw",
            background: "rgba(100,100,100,0.1)"
        };

        return (
            <div className="landingWrapper">
                <Row>
                    <Col xs={12} sm={7} md={7} className="phoneStyle">
                        <Waypoint 
                            onLeave={ this.handleTriggerOneLeave } 
                            onEnter={ this.handleTriggerOneEnter } 
                            scrollableAncestor={ window } 
                            fireOnRapidScroll={ true } 
                            topOffset="60%"/>
                        <Logo />
                        <Phone trigger={ this.state.triggerOne } />
                    </Col>
                    <Col xs={ 12 } sm={ 5 } md={ 5 }>
                        <Dropzone
                            style={{ position: "relative" }}
                            multiple={ false }
                            accept="image/*"
                            maxSize={ 4000000 }
                            minSize={ 5000 }
                            onDrop={ this.onDrop }
                            onDragEnter={ this.onDragEnter }
                            onDragLeave={ this.onDragLeave }>
                            { dropzoneActive && <div style={ overlayStyle }></div> }
                            <div className="navPanel_1">
                                <Waypoint   
                                    onEnter={ this.handleTriggerTwoEnter }  
                                    scrollableAncestor={ window } 
                                    topOffset="70%" 
                                    fireOnRapidScroll={ true }/>
                                <NavPanel
                                    text1="Upload your image"
                                    text2="to connect to"
                                    text3="the collection."
                                    trigger={ this.state.triggerTwo }/>
                                <button className="button"></button>
                                {this.state.rejectedFile && <p><b>Please upload an image file between 5kb and 4mb in size</b></p>}
                            </div>
                        </Dropzone>
                        <div className="navPanel_2">
                            <Waypoint   
                                onEnter={ this.handleTriggerThreeEnter } 
                                scrollableAncestor={ window } 
                                topOffset="80%"
                                fireOnRapidScroll={ true }/>
                            <NavPanel
                                text1="Search our tags"
                                text2="& add some more"
                                text3="on the go!"
                                trigger={ this.state.triggerThree }/>
                            <Link to="/explore">
                                <button className="button">
                                    explore
                                </button>
                            </Link>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default withRouter(Landing);