import React, { Component } from 'react';
import axios from 'axios';
import domtoimage from 'dom-to-image';
import _ from 'lodash';


import Logo from '../../components/logo/logo';
import Info from '../../components/returned_info/returned_info';
import Tags from '../../components/tag_list/tag_list';
import TagSubmit from '../../components/tag_submit/tag_submit';
import NavBtn from '../../components/nav_button';

/*****      Notes  ***** 
    currently localStorage is set after the api call and on WillUnmount.. this handles most situations except a page refresh during the api call
    the reference to the user uploaded image is not super reliable though, should probably scrap that and go back to using base64 store in localstorage, 
    but then we'd also have to figure out validation for file type, etc. 
    also, we still need to handle situations in which a user navigates directly to a page from the address bar and potentially causes a failed call etc.
*****/


class VisionResultsDesktop extends Component {
    constructor(props) {
        super(props)

        this.handleOnClick = this.handleOnClick.bind(this);

        this.state = { uploadedImg : this.props.location.state.filePath };
    }

    componentDidMount() {
        let prevState = localStorage.getItem('prevState');
        prevState = JSON.parse(prevState);
        if(this.state.uploadedImg === prevState.uploadedImg) {
            this.setState(prevState);
        } else {
            this.fetchImage();
        }
    }
    componentWillUnmount() {
        localStorage.setItem('prevState', JSON.stringify(this.state))
      }

    handleOnClick() {
        this.props.history.push('/download')
    }

    fetchImage() {
        const { fileName } = this.props.match.params;
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
                localStorage.setItem('prevState', JSON.stringify(this.state))
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
                    { returnedImg && <button onClick={this.handleOnClick} style={{fontSize: '50px'}}>download</button> }
                    <NavBtn route='/' btnText='try again!' />
                </Info>
            </div>
        );  
    }
}

export default VisionResultsDesktop;