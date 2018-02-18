import React, { Component } from 'react';
import Slider from 'react-slick';
import { Grid, Row, Col, Container } from 'react-grid-system';
import axios from 'axios';
import domtoimage from 'dom-to-image';
import _ from 'lodash';


import Logo from '../../components/logo/logo';
import Info from '../../components/returned_info/returned_info';
import Tags from '../../components/tag_list/tag_list';
import TagSubmit from '../../components/tag_submit/tag_submit';
import NavBtn from '../../components/nav_button';

import mocp from './mocp.png';
import me from './me.png';



class VisionResultsDesktop extends Component {
    constructor(props) {
        super(props)

        this.handleOnClick = this.handleOnClick.bind(this);

        this.state = { uploadedImg : JSON.parse(sessionStorage.getItem('uploadedImg')) };
    }

    componentDidMount() {
        let prevState = sessionStorage.getItem('prevState');
        prevState = JSON.parse(prevState);
        console.log(prevState);
        if(prevState){
            if(this.state.uploadedImg === prevState.uploadedImg) {
                this.setState(prevState);
            } else {
                this.fetchImage();
            }
        } else {
            this.fetchImage();
        }
    }
    componentWillUnmount() {
        sessionStorage.setItem('prevState', JSON.stringify(this.state))
      }

    handleOnClick() {
        this.props.history.push('/submit')
    }

    fetchImage() {
        let fileName = this.state.uploadedImg;
        fileName = fileName.split('/');
        fileName = fileName[fileName.length-1];
        axios
            .get(`/api/vision/${fileName}`)
            .then((res) => {
                const returnedTags = [];
                res.data.Tags.map(tag => returnedTags.push(tag.tag_name));
                this.setState({ 
                    title : res.data.title,
                    artist : res.data.artist,
                    visionTopTags : res.data.visionTopTags,
                    returnedTags,
                    returnedImg: res.data.web_path
                })
                sessionStorage.setItem('prevState', JSON.stringify(this.state))
            })
            .catch(err => console.log(err));
    }
    render() {
        const { title, artist, visionTopTags, uploadedImg, returnedImg, returnedTags } = this.state;

        const settings = {
            fade: true,
            dots: true,
            infinite: false,
            speed: 1000,
            autoplay: true,
            autoplaySpeed: 1000,
            slidesToShow: 1,
            slidesToScroll: 1,
        }
        return (
            <div className="explorePageContainer">
                <Slider { ...settings }>
                    <div>
                        <Row className="rowStyle">
                            <Col sm={6} className="imageWrapper">
                                <div className="imageContainer">
                                    <img 
                                        className="imageStyle"
                                        src={ uploadedImg }/>
                                </div>
                            </Col>
                            <Col sm={6}>
                                <Info
                                    image={ me }
                                    headerOne = "Some shit about what we're doing with google vision or whatever"
                                >
                                    { visionTopTags ? <Tags withHash={ true } tagList={ visionTopTags } /> : <p>fetching tags..</p> }
                                </Info>
                            </Col>
                        </Row>
                    </div> 
                    { returnedImg && 
                        <div>
                            <Row className="rowStyle">
                                <Col sm={6} className="imageWrapper">
                                    <div className="imageContainer">
                                        <img 
                                            className="imageStyle"
                                            src={ returnedImg }/>
                                    </div>
                                </Col>
                                <Col sm={6}>
                                    <Info
                                        image = { mocp }
                                        headerOne={ title }
                                        headerTwo={ artist }
                                    >
                                        <Tags withHash={ true } tagList={ returnedTags } />
                                     
                                    </Info>
                                </Col>
                            </Row>
                        </div> 
                    }
                </Slider>
                <NavBtn route='/explore' btnText='search again!' />
                {returnedImg && <NavBtn route='/submit' btnText='submit your results to mocp' />}
            </div>
        );
    }
}

export default VisionResultsDesktop;