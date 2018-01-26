import React, { Component } from 'react';
import axios from 'axios';

const API_KEY = '&api_key=CDrewNwfN9TWDnXhucfwDmCGcZIfoVuy&limit=5';
const ROOT_URL = 'http://api.giphy.com/v1/gifs/search?q='


class SearchResultsDesktop extends Component {
    constructor(props){
        super(props)

        this.state = {results : []}
    }
    /////////////////
    //this will eventually be moved to the appropriate component, just testing
    /////////////// 

    componentWillMount() {
        const { term } = this.props.match.params
        const videos = [];
        
        //////////more testing. eventually this should be the call to our db for image results

        axios.get(`${ROOT_URL}${term}${API_KEY}`)
        .then(response => {
            response.data.data.map(result => videos.push(result.images.original.url));
            this.setState({
                results: videos
            })           
        })
    }
    render() {
        if (this.state.results.length === 0) {
            return (
                <div>Loading...</div>
            )
        }
        return(
            <div>
                {this.state.results.map(url => <img src={url} />)}
            </div>
        )
    }
}

export default SearchResultsDesktop;