import React, { Component } from 'react';
import request from 'superagent';

import Image from '../../components/image/image';
import Info from '../../components/returned_info/returned_info';
import Tags from '../../components/tag_list/tag_list';
import TagSubmit from '../../components/tag_submit/tag_submit';
import { isNull } from 'util';

class VisionResultsDesktop extends Component {
    constructor(props) {
        super(props)

        this.state = { imageInfo : null };
    }

    componentDidMount() {
        console.log(this.props)
        const { fileName } = this.props.match.params;
        request
            .get(`/api/vision/${fileName}`)
            .end((err, res) => {
                if(err) { console.log(err) }
                console.log(res.body);
                this.setState({ imageInfo : res.body })
                console.log('new state', this.state.imageInfo.web_path)
            });
    }
    render(){
      return (
        <div>
            <Image source={this.props.location.uploadedImage.filePath} />
            {this.state.imageInfo ? <Image source={this.state.imageInfo.web_path} /> : <div>Loading...</div>}
        </div>
      )  
    }
}

export default VisionResultsDesktop;