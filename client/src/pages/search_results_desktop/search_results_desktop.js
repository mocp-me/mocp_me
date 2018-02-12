import React, { Component } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import {Grid, Row, Col, Container} from 'react-grid-system';

import Info from '../../components/returned_info/returned_info';
import Tags from '../../components/tag_list/tag_list';
import TagSubmit from '../../components/tag_submit/tag_submit';


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
        const searchResults = [];
        
        //////////more testing. eventually this should be the call to our db for image results

        //I think here would be a good  spot to collect an array of tags to later pass to the Tag component as props

        axios.get(`${ROOT_URL}${term}${API_KEY}`)
        .then(response => {
            response.data.data.map(result => {
                searchResults.push(result);
                searchResults.push(result);

            });
            this.setState({
                results: searchResults
            })           
        })
    }
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 250,
            slidesToShow: 1,
            slidesToScroll: 2,
            dotClass: 'slick-dots'
        }

        let toggle = true;


        if (this.state.results.length === 0) {
            return (
                //insert dope loading animation here..
                <div>Loading...</div>
            )
        }
        return(
            <div className="explorePageContainer">
                <Slider {...settings}>
                    {this.state.results.map(result => {
                        if(toggle){
                            toggle = !toggle;
                        return (
                            <div>
                                <Row className="rowStyle">
                                    <Col sm={6} className="imageWrapper">
                                        <div className="imageContainer">
                                            <img 
                                                className="imageStyle"
                                                src={result.images.original.url}/>
                                        </div>
                                    </Col>
                                    <Col sm={6}>
                                        <Info
                                            title={result.title}
                                            artist={result.type}
                                            link={result.source}
                                            tags={['an', 'array', 'of', 'tags']} 
                                        />
                                    </Col>
                                </Row>
                            </div>
                        )
                        } else {
                            toggle = !toggle;
                            return (
                                <div>
                                {/*<Col xs={6}>
                                    <Info
                                        title={result.title}
                                        artist={result.type}
                                        link={result.source}
                                    >
                                        <Tags  hash='true'/>
                                        <TagSubmit imageRef={result.images.original.url} />
                                    </Info>
                                        tags={['an', 'array', 'of', 'tags']} 
                                    />
                                </Col>*/}
                                </div>
                            )
                        }
                    })}    
                </Slider>
            </div>
        )
    }
}

export default SearchResultsDesktop;