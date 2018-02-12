import React, { Component } from 'react';
import Link from 'react-router-dom';

import Tag from '../tag_list_item/tag_list_item';

class Tags extends Component {
    constructor(props){
        super(props);
        //state will be an array of strings for trending tags
        //results from an ajax call could be passed as props, or a prop with some logic to make an ajax call here
    }
    render() {
        //pending ajax response
        if (this.props.tagList.length === 0) {
            return (
                <div>Loading..</div>
            )
        }
        return (
            <div className='trending-wrapper'>
                {this.props.children}
                    {this.props.tagList.map(tag => 
                        <Tag
                            key={tag}
                            isLink={this.props.isLink}
                            text={tag}
                            withHash={this.props.withHash}
                        />
                    )}

            </div>
        )
    }
}

export default Tags;