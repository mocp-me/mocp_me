import React, { ReactDOM, Component } from "react";
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
        this.handleScroll = this.handleScroll.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);

        this.state = {
            dropzoneActive: false,
            rejectedFile: false,
            pageScroll:0,
            phonepanel_height: 0,
            navpanel_1_height:0,
            navpanel_2_height:0
        }
    }
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);   
        // this.setState({  phonepanel_height: this.divRef_1.clientHeight });
        // var heightOne = this.div_ref_1.clientHeight;
        // console.log(heightOne);
        //============= ignore everything between these =============
        this.setState(() => {
            return { phonepanel_height: this.divRef_1.clientHeight };
        });
        //============= ============= ============= ============= =============
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll(event){
        let y_scroll_pos = window.pageYOffset;
        this.setState(() => {
            return { pageScroll: y_scroll_pos };
        });

        // just trying to get it to console.log the height of an element to save in state on mount
        // this will log the column that im referencing (so the ref works)
        let calculatedHeight = this.divRef_1;
        // I tried ``` let calculatedHeight = this.divRef_1.clientHeight ``` per internet documentation, but it would just return undefined. 

        console.log(calculatedHeight);

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
                    <Col xs={12} sm={7} md={7} 
                        className="phoneStyle" 
                        ref={ (element_one) => this.divRef_1 = element_one}>
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