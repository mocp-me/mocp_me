import React, { Component } from 'react';
import Slider from 'react-slick';
import { Grid, Row, Col, Container } from 'react-grid-system';
import axios from 'axios';
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
        super(props);

        this.handleTagSubmit = this.handleTagSubmit.bind(this);

        this.state = { 
            uploadedImg : JSON.parse(sessionStorage.getItem('uploadedImg')),
            searchFail: false
         };
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
        sessionStorage.setItem('prevState', JSON.stringify(this.state));
      }

    handleTagSubmit(event) {
        event.preventDefault();
        const tag = event.target.elements.term.value;
        const data = {
            id: this.state.imgId,
            tag
        };
        //make a post with these!
        axios
            .post('/api/submit-tag', data)
            .then(res => console.log(res));
    }

    fetchImage() {
        let fileName = this.state.uploadedImg;
        fileName = fileName.split('/');
        fileName = fileName[fileName.length-1];
        axios
            .get(`/api/vision/${fileName}`)
            .then((res) => {
                if(res.data === 'no results'){
                    this.setState({searchFail: true})
                    return;
                }
                const returnedTags = [];
                const { title, artist, visionTopTags, web_path, id } = res.data;
                res.data.Tags.map(tag => returnedTags.push(tag.tag_name));
                this.setState({ 
                    returnedImg : web_path,
                    imgId: id,
                    title,
                    artist,
                    visionTopTags,
                    returnedTags
                });
                sessionStorage.setItem('prevState', JSON.stringify(this.state));
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
        if(this.state.searchFail) {
            return (
                <h3>omg your super unique photo didnt match any of the 90,000 tags in our database!</h3>
            );
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
                    { !returnedImg && <div>Loading...</div> }
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
                                        <NavBtn route='/' btnText='try again' />
                                        {/* {returnedImg && <NavBtn route='/submit' btnText='submit your results to mocp' />} */}
                                        <p>Suggest a new tag: </p>
                                        <TagSubmit
                                            handleTagSubmit={ this.handleTagSubmit }
                                            btnText="Send iiiittt!" />
                                    </Info>
                                </Col>
                            </Row>
                        </div> 
                    }
                </Slider>
            </div>
        );
    }
}

export default VisionResultsDesktop;