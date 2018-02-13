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
                console.log('some data', res.data);
                this.setState({ 
                    title : res.data.title,
                    artist : res.data.artist,
                    tags : res.data.topTags,
                    returnedImg: res.data.web_path
                })
            })
            .catch(err => console.log(err));
    }

    render() {
        const { title, artist, tags, returnedImg } = this.state;
        const uploadedImage = this.props.location.uploadedImage.filePath
        return (
            <div>
                <div style={{backgroundColor: 'black'}}>
                    <Logo />
                </div> 
                <img src={uploadedImage} />
                {returnedImg ? <img src={returnedImg} /> : <div>Loading...</div>}
                <Info 
                    title={title ? title : 'Loading...'}
                    artist={artist ? artist : 'Loading...'}
                >
                    { tags ? <Tags tagList={tags} /> : <div>Loading...</div> }
                    <p>add a tag: </p>
                    { returnedImg ? <TagSubmit imageRef={returnedImg} /> : <div>Loading...</div>}
                </Info>
            </div>
        );  
    }
}

export default VisionResultsDesktop;