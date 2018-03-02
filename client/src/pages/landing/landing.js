import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Dropzone from "react-dropzone";
import Waypoint from 'react-waypoint';
import { Row, Col } from "react-grid-system"
import axios from "axios";
import autoBind from 'auto-bind';

import Logo from "../../components/logo/logo";
import Phone from "../../components/phone/phone";
import NavPanel from "../../components/nav_panel/nav_panel";

class Landing extends Component {
    constructor(props) {
        super(props);

        autoBind(this);

        this.state = {
            dropzoneActive: false,
            fileRejected: false,
            processingUpload: false,
            animationTriggerOne: false,
            animationTriggerTwo: false,
            animationTriggerThree: false 
        }
    }

    onDragEnter() {
        this.setState({ dropzoneActive: true });
    }

    onDragLeave() {
            this.setState({ dropzoneActive: false });
    }

    handleOnDrop(accepted, rejected) {
        if(rejected.length > 0) {
            console.log(rejected)
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

    handleTrigger(trigger) {
        if (window.innerWidth < 450 && !this.state[trigger]) {
            this.setState({ [trigger] : true });
        }
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
                        onLeave={ () => this.handleTrigger('animationTriggerOne') }
                       />
                        <Logo />
                        <Phone  animate={this.state.animationTriggerOne}/>
                    </Col>
                    <Col xs={ 12 } sm={ 5 } md={ 5 }>
                        <Dropzone
                            style={{ position: "relative" }}
                            multiple={ false }
                            accept="image/*"
                            maxSize={ 4000000 }
                            minSize={ 5000 }
                            onDrop={ this.handleOnDrop }
                            onDragEnter={ this.onDragEnter }
                            onDragLeave={ this.onDragLeave }>
                            { dropzoneActive && <div style={ overlayStyle }></div> }
                            <div className="navPanel_1">
                                <Waypoint   
                                    onEnter={ () => this.handleTrigger('animationTriggerTwo') }
                                    bottomOffset="55%" />
                                <NavPanel
                                    text1="Upload your image"
                                    text2="to connect to"
                                    text3="the collection."
                                    animate={ this.state.animationTriggerTwo } />
                                <button className="button">
                                    {this.state.fileUploaded ? 'processing...' : 'add image'}
                                </button>
                                {this.state.fileRejected && <p><b>Please upload an image file between 5kb and 4mb in size</b></p>}
                            </div>
                        </Dropzone>
                        <div className="navPanel_2">
                            <Waypoint   
                                onEnter={ () => this.handleTrigger('animationTriggerThree') } 
                                bottomOffset="55%" />
                            <NavPanel
                                text1="Search our tags"
                                text2="& add some more"
                                text3="on the go!"
                                animate={ this.state.animationTriggerThree } />
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