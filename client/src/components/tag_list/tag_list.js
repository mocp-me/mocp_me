import React, { Component } from 'react';
import Link from 'react-router-dom';

import Tag from '../tag_list_item/tag_list_item';


class Tags extends Component {
    constructor(props){
        super(props);
        //state will be an array of strings for trending tags
        //results from an ajax call could be passed as props, or a prop with some logic to make an ajax call here
        this.state = {tags : ['funny cat', 'cute cat','sad cat', 'dumb cat','doggos']}
    }
    componentWillMount () {
        //ajax call to get trending tags
    }

    render() {
        //pending ajax response
        if (this.state.tags.length === 0) {
            return (
                <div>Loading..</div>
            )
        }
        return (
            <div className='trending-wrapper'>
                {this.props.children}
                <ul>
                    {this.state.tags.map(tag => 
                        <Tag
                            key={tag}
                            isLink={true}
                            text={tag}
                            withHash={true}
                        />
                    )}
                </ul>
            </div>
        )
    }

}

export default Tags;