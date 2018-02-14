import React, { Component } from 'react';
import axios from 'axios';
import domtoimage from 'dom-to-image';

import Logo from '../../components/logo/logo';
import Info from '../../components/returned_info/returned_info';
import Tags from '../../components/tag_list/tag_list';
import TagSubmit from '../../components/tag_submit/tag_submit';

class VisionResultsDesktop extends Component {
    constructor(props) {
        super(props)

        this.handleOnClick = this.handleOnClick.bind(this);

        this.state = { uploadedImg : this.props.location.uploadedImg.filePath };
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

    handleOnClick() {
        this.props.history.push({
            pathname: `/download`,
            uploadedImg: this.state.uploadedImg,
            returnedImg: this.state.returnedImg
        })
    }

    render() {
        const { title, artist, visionTopTags, returnedImg, returnedTags } = this.state;
        return (
            <div id="my-node">
                <div style={{ backgroundColor: 'black', color: 'white' }}>
                    <Logo />
                    { visionTopTags ? <Tags tagList={ visionTopTags } /> : null }
                </div> 
                <img src={ this.state.uploadedImg } />
                { returnedImg ? <img src={ returnedImg } /> : <div>Loading...</div> }
                <Info 
                    title={ title ? title : 'Loading...' }
                    artist={ artist ? artist : 'Loading...' }
                >
                    { returnedTags ? <Tags withHash={ true } tagList={ returnedTags } /> : <div>Loading...</div> }
                    <p>add a tag: </p>
                    <TagSubmit imageRef={ returnedImg && returnedImg } />
                    { returnedImg && <button onClick={this.handleOnClick} style={{fontSize: '50px'}}>download</button> }
                </Info>
            </div>
        );  
    }
}

export default VisionResultsDesktop;