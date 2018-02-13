import React, { Component } from 'react';
import axios from 'axios';

import Logo from '../../components/logo/logo';
import Info from '../../components/returned_info/returned_info';
import Tags from '../../components/tag_list/tag_list';
import TagSubmit from '../../components/tag_submit/tag_submit';

class VisionResultsDesktop extends Component {
    constructor(props) {
        super(props)

        this.state = {};
    }
    
    componentWillMount() {
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
            })
            .catch(err => console.log(err));
    }

    render() {
        const { title, artist, visionTopTags, returnedImg, returnedTags } = this.state;
        const uploadedImage = this.props.location.uploadedImage.filePath
        return (
            <div>
                <div style={{ backgroundColor: 'black', color: 'white' }}>
                    <Logo />
                    { visionTopTags ? <Tags tagList={ visionTopTags } /> : null }
                </div> 
                <img src={ uploadedImage } />
                { returnedImg ? <img src={ returnedImg } /> : <div>Loading...</div> }
                <Info 
                    title={ title ? title : 'Loading...' }
                    artist={ artist ? artist : 'Loading...' }
                >
                    { returnedTags ? <Tags withHash={ true } tagList={ returnedTags } /> : <div>Loading...</div> }
                    <p>add a tag: </p>
                    <TagSubmit imageRef={ returnedImg && returnedImg } />
                </Info>
            </div>
        );  
    }
}

export default VisionResultsDesktop;