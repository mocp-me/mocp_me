import React, { Component } from 'react';
import axios from 'axios';

import Image from '../../components/returned_images/returned_images';
import Info from '../../components/returned_info/returned_info';

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
        const someStuff = [];
        
        //////////more testing. eventually this should be the call to our db for image results

        axios.get(`${ROOT_URL}${term}${API_KEY}`)
        .then(response => {
            console.log(response)
            response.data.data.map(result => someStuff.push(result));
            this.setState({
                results: someStuff
            })           
        })
    }
    render() {
        if (this.state.results.length === 0) {
            return (
                //insert dope loading animation here..
                <div>Loading...</div>
            )
        }
        return(
            //also 'this' isn't recognized unless you wrap everything in the outer div.. weird!
            <div>
                {this.state.results.map(thing =>{
                    //not sure why this has to be wrapper in a return here, but it doesnt work otherwise
                    return(
                        <div>
                            <Image source={thing.images.original.url} />
                            <Info
                            title={thing.title}
                            artist={thing.type}
                            link={thing.source}
                            tags={['this', 'would', 'be', 'an', 'array', 'of', 'tags', '???']} 
                            />
                        </div>
                    ) 
                })}    
            </div>
        )
    }
}

export default SearchResultsDesktop;