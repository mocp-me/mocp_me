import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Dropzone from "react-dropzone";
import axios from "axios";
import Logo from "../../components/logo/logo";
import Phone from "../../components/phone/phone";
import NavPanel from "../../components/nav_panel/nav_panel";

import {Grid, Row, Col, Container, Clearfix} from "react-grid-system"

class Landing extends Component {
    constructor(props) {
        super(props);

        this.onDrop = this.onDrop.bind(this);
        this.onDragEnter = this.onDragEnter.bind(this);
        this.onDragLeave = this.onDragLeave.bind(this);

        this.state = {
            dropzoneActive: false,
            rejectedFile: false
        }
    }
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll(event){
        let y_scroll_pos = window.pageYOffset;
        console.log("scroll pos  " + y_scroll_pos); 
        let animation1 = event.srcElement.body.height;
        console.log(animation1); 

    }

    onDragEnter() {
        this.setState(() => {
            return {dropzoneActive: true}
        });
    }

    onDragLeave() {
        this.setState(() => {
            return {dropzoneActive: false}
        });
    }

    onDrop(accepted, rejected) {
        console.log('accepted: ', accepted)
        console.log('rejected: ', rejected)
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
                    <Col xs={12} sm={7} md={7} className="phoneStyle">
                        <Logo />
                        <Phone />
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
                            onDragLeave={this.onDragLeave}
                            
                            >
                                { dropzoneActive && <div style={overlayStyle}></div> }
                                <div className="navPanel_1">
                                  <NavPanel
                                    text1="Upload your image"
                                    text2="to connect to"
                                    text3="the collection."
                                  />
                                  <button className="button">
                                    add image
                                  </button>
                                  {this.state.rejectedFile && <p>File type or size rejected! :(<br/>Upload an image file between 5kb and 4mb in size</p>}
                                </div>
                        </Dropzone>
                        <div className="navPanel_2">
                          <NavPanel
                            text1="Search our tags"
                            text2="& add some more"
                            text3="on the go!"
                            />
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