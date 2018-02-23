import React, { Component } from 'react';
import Slider from 'react-slick';
import { Grid, Row, Col, Container } from 'react-grid-system';
import axios from 'axios';
import _ from 'lodash';
import ClassNames from 'classnames';

import Logo from '../../components/logo/logo';
import Info from '../../components/returned_info/returned_info';
import Tags from '../../components/tag_list/tag_list';
import TagSubmit from '../../components/tag_submit/tag_submit';
import NavBtn from '../../components/nav_button';

import logo from './../../components/logo/logo.png';

class VisionResultsDesktop extends Component {
    constructor(props) {
        super(props);

        this.handleTagSubmit = this.handleTagSubmit.bind(this);

        this.state = { 
            uploadedImg : JSON.parse(sessionStorage.getItem('uploadedImg')),
            searchFail: false
         };
    }

    componentWillMount(){
        if(!this.state.uploadedImg) {
            this.props.history.push('/');
        }
    }

    componentDidMount() {
        let prevState = sessionStorage.getItem('prevState');
        //all these nested if statements look gross.. should clean up later
        if(this.state.uploadedImg){
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
            .then(res => {
                if(res.data === 'no results') {
                    this.setState({ searchFail: true });
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
                <div className = "searchFail">
                    <div className = "logoWrapper">
                        <img   
                            src={ logo } 
                            className = "logoStyle" />
                    </div>
                    <div className= "failText">
                        <p><b>Sorry</b> - we don't have any tags matching yours in our database.</p>
                    </div>
                </div>
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
                                    image={ logo }
                                    headerOne = "Swipe left to see your match from the collection."
                                    headerTwo = "Please enter your email below to submit your pairing for an exhibition at the MoCP.">
                                    { visionTopTags ? <Tags withHash={ true } tagList={ visionTopTags } /> : <p>fetching tags..</p> }
                                    {/*Just reused the below component - will be swapped out with something to collect email addresses / contact info?*/}
                                    <TagSubmit
                                        handleTagSubmit={ null }
                                        btnText="submit" />
                                    <NavBtn route='/' btnText='upload a new photo' />
                                </Info>
                            </Col>
                        </Row>
                    </div> 
                    { !returnedImg && 
                        <div className = "loaderWrapper">
                            <div className = "logoWrapper">
                                <img   src={ logo } 
                                    className = "logoStyle" />
                            </div>
                        </div> }
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
                                        image={ logo }
                                        headerOne={ title }
                                        headerTwo={ artist }>
                                        <Tags withHash={ true } tagList={ returnedTags } />
                                        {/* {returnedImg && <NavBtn route='/submit' btnText='submit your results to mocp' />} */}
                                        <p>Suggest a new tag: </p>
                                        <TagSubmit
                                            handleTagSubmit={ this.handleTagSubmit }
                                            btnText="submit" />
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