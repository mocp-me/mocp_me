import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Slider from 'react-slick';

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
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
        }

        if (this.state.results.length === 0) {
            return (
                //insert dope loading animation here..
                <div>Loading...</div>
            )
        }
        return(
            <div>
                <Slider {...settings}>
                    {this.state.results.map(thing => {
                        return (
                            <div>
                                <Image source={thing.images.original.url} />
                                <Info
                                title={thing.title}
                                artist={thing.type}
                                link={thing.source}
                                tags={['an', 'array', 'of', 'tags']} 
                                />
                            </div>
                        ) 
                    })}    
                </Slider>
            </div>
        )
        // return (
        //     <div>
        //       <h2> Lazy Load</h2>
        //       <Slider {...settings}>
        //         <div><img src={this.state.results[0].images.original.url} /></div>
        //         <div><img src={this.state.results[1].images.original.url} /></div>
        //         <div><img src={this.state.results[2].images.original.url} /></div>
        //         <div><img src={this.state.results[3].images.original.url} /></div>
        //       </Slider>
        //     </div>
        //   );
    }
}

export default SearchResultsDesktop;