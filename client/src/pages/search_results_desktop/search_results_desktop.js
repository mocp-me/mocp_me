import React, { Component } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { Grid, Row, Col, Container } from 'react-grid-system';

import Info from '../../components/returned_info/returned_info';
import Tags from '../../components/tag_list/tag_list';
import TagSubmit from '../../components/tag_submit/tag_submit';



class SearchResultsDesktop extends Component {
    constructor(props) {
        super(props);

        this.state = { results : [] }
    }

    componentDidMount() {
        const { term } = this.props.match.params
        const searchResults = [];
        axios
        .get(`/api/search-tags/${term}`)
        .then((res) => {
            console.log(res)
            this.setState({ 
                results : res.data
            });
            console.log('new state', this.state)
        })
        .catch(err => console.log(err));
    }

    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 250,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dotClass: 'slick-dots'
        }
        
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
                        console.log(result)
                        let tags = [];
                        result.Tags.map(tag => {
                            tags.push(tag.tag_name)
                        })
                        return (
                            <div>
                                <Row className="rowStyle">
                                    <Col sm={6} className="bgWrapper">
                                        <div className="imageWrapper">
                                            <div className="imageContainer">
                                                <div className="imageClip">
                                                    <img 
                                                        className="imageStyle"
                                                        src={ result.web_path }/>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col sm={6} className="resultContainer">
                                        <Info
                                            title={ result.title }
                                            artist={ result.artist }
                                        >
                                            <Tags isLink={ true } withHash={ true } tagList={ tags } />
                                        </Info>
                                    </Col>
                                </Row>
                            </div> 
                        );
                    })}
                </Slider>
            </div>
        );
    }
}

export default SearchResultsDesktop;