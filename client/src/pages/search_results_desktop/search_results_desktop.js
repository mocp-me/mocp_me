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

        this.handleTagSubmit = this.handleTagSubmit.bind(this)

        this.state = { results : [] }
    }

    componentDidMount() {
        const { term } = this.props.match.params
        axios
        .get(`/api/search-tags/${term}`)
        .then((res) => {
            const results = this.shuffleResults(res.data);
            console.log('shuffled results', results)
            this.setState({ results });
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
            }
            axios
                .post('/api/submit-tag', data)
                .then(res => console.log(res))
        }

        event.target.elements.term.value = ""
    }

    // the famous Fisher-Yates shuffle algorithm. thanks google :)
    shuffleResults(array) {
        let currentIndex = array.length, temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
        const fiveResults = array.slice(0,5)
        return fiveResults;
      }

    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 250,
            slidesToShow: 1,
            slidesToScroll: 1,
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
                    {this.state.results.map(results => {
                        let tags = [];
                        results.Tags.map(tag => {
                            tags.push(tag.tag_name)
                        })
                        return (
                            <div key={results.id}>
                                <Row className="rowStyle">
                                    <Col sm={6} className="imageWrapper">
                                        <div className="imageContainer">
                                            <img 
                                                className="imageStyle"
                                                src={ results.web_path }/>
                                        </div>
                                    </Col>
                                    <Col sm={6}>
                                        <p>Suggest a new tag: </p>
                                        <TagSubmit
                                            handleTagSubmit={this.handleTagSubmit(results.id)}
                                            btnText="omg thanx!" />
                                    </Col>
                                </Row>
                            </div> 
                        );
                    })}
                </Slider>
                <NavBtn route='/explore' btnText='search again!' />
            </div>
        );
    }
}

export default SearchResultsDesktop;