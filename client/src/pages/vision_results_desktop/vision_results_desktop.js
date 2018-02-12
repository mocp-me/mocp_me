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
        console.log('params', this.props.match.params)
        const { file } = this.props.match.params;
        console.log('file path', file);

        request
            .get(`/api/vision/${file}`)
            .end((err, res) => {
                if(err) { console.log(err) }
                console.log(res.body);
            });
    }
    render(){
        return (
            <img src="../../../upload/fd2d1291f427cf0c2d08637aacba5a34" />
        )
    }
}

export default VisionResultsDesktop;