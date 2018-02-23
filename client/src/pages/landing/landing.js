import React, { ReactDOM, Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Dropzone from "react-dropzone";
import Waypoint from 'react-waypoint';
import {Grid, Row, Col, Container, Clearfix} from "react-grid-system"
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
        this.handleScroll = this.handleScroll.bind(this);

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

    handleScroll(event){
        // console.log("outside phone " + this.state.triggerOne);
    }

    onDragEnter() {
        this.setState(() => {
            return { dropzoneActive: true }
        });
    }

    onDragLeave() {
        this.setState(() => {
            return { dropzoneActive: false }
        });
    }

    onDrop(accepted, rejected) {
        if(rejected.length > 0) {
            this.setState({ rejectedFile: true })
            return;
        }
        this.setState(() => {
            return {dropzoneActive: false}
        });
        const image = new FormData();
        image.append("image", accepted[0]);
        axios.post("/api/upload", image)
            .then(res => {
                sessionStorage.setItem("uploadedImg", JSON.stringify(res.data.imageUrl));
                this.props.history.push("/vision_search");
            })
            .catch(err => console.log(err));
    }

    handleTriggerOneEnter(obj) {
        // console.log(obj)
        // console.log('hit trigger one enter');
        this.setState({triggerOne: true});
    }
    handleTriggerOneLeave(obj) {
        // console.log('hit trigger one leave');
        this.setState({triggerOne: false});
    }

    handleTriggerTwoEnter(obj) {
        console.log('hit trigger two enter');
        this.setState({triggerTwo: true});
    }
    handleTriggerTwoLeave(obj) {
        console.log('hit trigger two leave');
        this.setState({triggerTwo: false});
    }

    handleTriggerThreeEnter(obj) {
        console.log('hit trigger three enter');
        // this.setState(() => {
        //     return { triggerThree: true }
        // });
    }
    handleTriggerThreeLeave(obj) {
        console.log('hit trigger three leave');
        // this.setState(() => {
        //     return { triggerThree: false }
        // });
    }

    render() {

        const {dropzoneActive} = this.state;
        const overlayStyle = {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            background: "rgba(0,0,0,0.1)"
        };

        return (
            <div className="landingWrapper">
                <Row>
                    <Col
                        xs={12} sm={7} md={7} 
                        className="phoneStyle">
                        <Waypoint onLeave={this.handleTriggerOneLeave} 
                                    onEnter={this.handleTriggerOneEnter} 
                                    scrollableAncestor={window} 
                                    fireOnRapidScroll={ true } 
                                    topOffset="50%"
                        />
                        <Logo />
                        <Phone 
                            triggerOne={this.state.triggerOne}
                        />
                    </Col>
                    <Col xs={12} sm={5} md={5}>
                        <Dropzone
                            style={{ position: "relative" }}
                            multiple={false}
                            accept="image/*"
                            maxSize={4000000}
                            minSize={5000}
                            onDrop={this.onDrop}
                            onDragEnter={this.onDragEnter}
                            onDragLeave={this.onDragLeave}>
                            { dropzoneActive && <div style={overlayStyle}></div> }
                            <div className="navPanel_1">
                            <Waypoint onEnter={this.handleTriggerTwoEnter} scrollableAncestor={window} topOffset="49%" bottomOffset="49%" fireOnRapidScroll={ false }/>
                                <NavPanel
                                  text1="Upload your image"
                                  text2="to connect to"
                                  text3="the collection."/>
                                <button className="button">
                                  add image
                                </button>
                                {this.state.rejectedFile && <p>File type or size rejected! :(<br/>Upload an image file between 5kb and 4mb in size</p>}
                            </div>
                        </Dropzone>
                        <div className="navPanel_2">
                        <Waypoint onEnter={this.handleTriggerThreeEnter} scrollableAncestor={window} topOffset="49%" bottomOffset="49%" fireOnRapidScroll={ true }/>
                          <NavPanel
                            text1="Search our tags"
                            text2="& add some more"
                            text3="on the go!"/>
                            <Link to="/explore">
                              <button className="button">
                                  explore
                              </button>
                            </Link>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default withRouter(Landing);