import React, { Component } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { Grid, Row, Col, Container } from 'react-grid-system';

import Info from '../../components/returned_info/returned_info';
import Tags from '../../components/tag_list/tag_list';
import TagSubmit from '../../components/tag_submit/tag_submit';
import NavBtn from '../../components/nav_button';

class SearchResultsDesktop extends Component {
    constructor(props) {
        super(props);

        this.handleTagSubmit = this.handleTagSubmit.bind(this);

        this.state = { 
            results : [],
            searchFail: false 
        };
    }

    componentDidMount() {
        const { term } = this.props.match.params;
        this.fetchImages(term);
       
    }

    componentWillReceiveProps() {
        const { term } = this.props.match.params;
        this.fetchImages(term);
    }

    fetchImages(term) {
        axios
        .get(`/api/search-tags/${term}/random`)
        .then((res) => {
            const results = res.data;
            if (results.length === 0) {
                this.setState({searchFail : true});
            } else {
                this.setState({ results });
            }
        })
        .catch(err => console.log(err));
    }

    handleTagSubmit = (id) => (event) => {
        event.preventDefault();
        const tag = event.target.elements.term.value;
        //there are way more sophisticated ways to handle form submittal, but this shit isn't very important, so fuck it.
        if(tag.length > 1 && tag.length<12) {
            const data = {
                id,
                tag
            };
            axios
                .post('/api/submit-tag', data)
                .then(res => console.log(res));
        }
        event.target.elements.term.value = "";
    }

    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 250,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dotClass: 'slick-dots',
        }

        if(this.state.results.length === 1) {
            settings.dots = false;
            settings.draggable = false;
            settings.slidesToScroll = 0;
        }

        if (this.state.results.length === 0) {
            if(this.state.searchFail) {
                return (
                    <div>No results, please try again! Avoid typing a valid search and then quickly backspacing and while mashing the enter key.. </div>

                );
            }
            return (
                //insert dope loading animation here..
                <div>Loading...</div>
            );
        }

        const slides = this.state.results.map(result => {
            let tags = [];
            result.Tags.map(tag => {
                tags.push(tag.tag_name)
            });
            return (
                <div key={result.id}>
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
                                headerOne={ result.title }
                                headerTwo={ result.artist }
                            >
                                <Tags isLink={ true } withHash={ true } tagList={ tags } />
                                <p>Suggest a new tag: </p>
                                <TagSubmit
                                    handleTagSubmit={this.handleTagSubmit(result.id)}
                                    btnText="omg thanx!" />
                                <NavBtn route='/explore' btnText='search again!' />
                            </Info>
                        </Col>
                    </Row>
                </div> 
            );
        })

        return(
            <div className="explorePageContainer">
                <Slider {...settings}>
                    {slides}
                    { this.state.results.length === 1 && <div></div> }
                </Slider>
            </div>
        );
    }
}

export default SearchResultsDesktop;