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

        this.handleTagSubmit = this.handleTagSubmit.bind(this);

        this.state = { uploadedImg : JSON.parse(sessionStorage.getItem('uploadedImg')) };
    }

    componentDidMount() {
        let prevState = sessionStorage.getItem('prevState');
        prevState = JSON.parse(prevState);
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

    handleTagSubmit(event) {
        event.preventDefault();
        const tag = event.target.elements.term.value;
        const data = {
            id: this.state.imgId,
            tag
        }
        //make a post with these!
        axios
            .post('/api/submit-tag', data)
            .then(res => console.log(res))
    }

    fetchImage() {
        let fileName = this.state.uploadedImg;
        fileName = fileName.split('/');
        fileName = fileName[fileName.length-1];
        axios
            .get(`/api/vision/${fileName}`)
            .then((res) => {
                console.log('vision res', res)
                const returnedTags = [];
                res.data.Tags.map(tag => returnedTags.push(tag.tag_name));
                this.setState({ 
                    title : res.data.title,
                    artist : res.data.artist,
                    visionTopTags : res.data.visionTopTags,
                    returnedTags,
                    returnedImg: res.data.web_path,
                    imgId: res.data.id
                })
                sessionStorage.setItem('prevState', JSON.stringify(this.state))
            })
            .catch(err => console.log(err));
    }
    render() {
        const { title, artist, visionTopTags, uploadedImg, returnedImg, returnedTags } = this.state;

        const settings = {
            dots: true,
            infinite: true,
            speed: 250,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dotClass: 'slick-dots'
        }
        return (
            <div className="explorePageContainer">
                <Slider { ...settings }>
                    <div>
                        <Row className="rowStyle">
                            <Col sm={6} className="bgWrapper">
                                <div className="imageWrapper">
                                    <div className="imageContainer">
                                        <div className="imageClip">
                                            <img 
                                                className="imageStyle"
                                                src={ uploadedImg }/>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col sm={6} className="resultContainer">
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
                                <Col sm={6} className="bgWrapper">
                                    <div className="imageWrapper">
                                        <div className="imageContainer">
                                            <div className="imageClip">
                                                <img 
                                                    className="imageStyle"
                                                    src={ returnedImg }/>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col sm={6} className="resultContainer">
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
                {/* This should be nested inside of the Info component on the returned Img, 
                    putting it here for now because I cant click on shit in the fucked up, unstlyed version of the carousel */}
                <p>Suggest a new tag: </p>
                <TagSubmit
                    handleTagSubmit={this.handleTagSubmit}
                    btnText="Send iiiittt!" />
            </div>
        );
    }
}

export default VisionResultsDesktop;