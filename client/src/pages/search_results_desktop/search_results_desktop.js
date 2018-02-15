import React, { Component } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { Grid, Row, Col, Container } from 'react-grid-system';

import Info from '../../components/returned_info/returned_info';
import Tags from '../../components/tag_list/tag_list';
import TagSubmit from '../../components/tag_submit/tag_submit';

<<<<<<< HEAD

const API_KEY = '&api_key=CDrewNwfN9TWDnXhucfwDmCGcZIfoVuy&limit=5';
const ROOT_URL = 'http://api.giphy.com/v1/gifs/search?q='
=======
const rowStyle={
    marginTop:'20vh',
    minHeight:'0px',
    minWidth:'0px',
    height:'100vh',
    overflowY:'none'
}
const imageStyle={
    height:'60vh',
    paddingLeft:'10vw'
}
const imageContainer={
    padding:'10px',
    background:'black',
    height:'100%',
    width:'350px',
}
const pageContainer={
    background:'#D0D0D0'
}
>>>>>>> test


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
            slidesToScroll: 2,
            dotClass: 'slick-dots'
        }
        
        if (this.state.results.length === 0) {
            return (
                //insert dope loading animation here..
                <div>Loading...</div>
            )
        }
        return(
<<<<<<< HEAD
            <div className="explorePageContainer">
                <Slider {...settings}>
=======
            <div style={ pageContainer }>
                <Slider { ...settings }>
>>>>>>> test
                    {this.state.results.map(result => {
                        return (
                            <div>
                                <Row className="rowStyle">
                                    <Col sm={6} className="imageWrapper">
                                        <div className="imageContainer">
                                            <img 
<<<<<<< HEAD
                                                className="imageStyle"
                                                src={result.images.original.url}/>
=======
                                                style={{ width:'100%', verticalAlign:'center' }}
                                                src={ result.web_path }/>
>>>>>>> test
                                        </div>
                                    </Col>
                                    <Col sm={6}>
                                        <Info
                                            title={ result.title }
                                            artist={ result.artist }
                                            link={null}
                                            tags={ ['an', 'array', 'of', 'tags'] } 
                                        />
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