import React, { Component } from 'react';
import axios from 'axios';
import domtoimage from 'dom-to-image';
import _ from 'lodash';


import Logo from '../../components/logo/logo';
import Info from '../../components/returned_info/returned_info';
import Tags from '../../components/tag_list/tag_list';
import TagSubmit from '../../components/tag_submit/tag_submit';
import NavBtn from '../../components/nav_button';


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
        return (
            <div id="my-node">
                <div style={{ backgroundColor: 'black', color: 'white' }}>
                    <Logo />
                    { visionTopTags ? <Tags tagList={ visionTopTags } /> : null }
                </div> 
                <img src={ uploadedImg } />
                { returnedImg ? <img src={ returnedImg } /> : <div>Loading...</div> }
                <Info 
                    title={ title ? title : 'Loading...' }
                    artist={ artist ? artist : 'Loading...' }
                >
                    { returnedTags ? <Tags withHash={ true } tagList={ returnedTags } /> : <div>Loading...</div> }
                    <p>add a tag: </p>
                    <TagSubmit imageRef={ returnedImg && returnedImg } />
                    { returnedImg && <button onClick={this.handleOnClick} style={{fontSize: '50px'}}>Submit</button> }
                    <NavBtn route='/' btnText='try again!' />
                </Info>
            </div>
        );  
    }
}

export default VisionResultsDesktop;