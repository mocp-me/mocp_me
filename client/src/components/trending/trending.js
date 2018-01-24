import React, { Component } from 'react';


class Trending extends Component {
    constructor(props){
        super(props);
        //state will be an array of strings for trending tags
        this.state = {trendingTags : ['tag1', 'tag2']}
    }

    componentWillMount () {
        //ajax call to get trending tags
    }

    render() {
        //pending ajax response
        if (this.state.trendingTags.length == 0) {
            return (
                <div>Loading..</div>
            )
        }
        return (
            <div className='trending-wrapper'>
                <h3>Trending Tags : </h3>
                <ul>
                    {this.state.trendingTags.map(tag => <li key={tag}>{tag}</li>)}
                </ul>
            </div>
        )
    }

}

export default Trending;