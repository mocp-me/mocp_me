import React, { Component } from 'react';
import request from 'superagent';

import Image from '../../components/image/image';
import Info from '../../components/returned_info/returned_info';
import Tags from '../../components/tag_list/tag_list';
import TagSubmit from '../../components/tag_submit/tag_submit';

class VisionResultsDesktop extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        console.log('props', this.props)
        const { fileName } = this.props.match.params;
        request
            .get(`/api/vision/${fileName}`)
            .end((err, res) => {
                if(err) { console.log(err) }
                console.log(res.body);
            });
    }
    componentDidMount() {
    }
    render(){
        return (
            <img src={this.props.location.uploadedImage.filePath} />
        )
    }
}

export default VisionResultsDesktop;