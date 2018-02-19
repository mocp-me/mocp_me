import React, { Component } from 'react';
import {Grid, Row, Col, Container} from 'react-grid-system';
import { withRouter } from 'react-router-dom';
import Media from "react-media";
import axios from 'axios';

import Logo from '../../components/logo/logo';
import TagSubmit from '../../components/tag_submit/tag_submit';
import Tags from '../../components/tag_list/tag_list';
import NavBtn from '../../components/nav_button';
import SearchBar from '../../components/search_bar';


class ExploreSearch extends Component {
    constructor(props){
        super(props);
    
        this.handleTagSubmit = this.handleTagSubmit.bind(this);

        this.state = {
            tags : ['cat', 'dog'],
            disableSearch: true
        }

    }

    componentDidMount () {
        //ajax call to get trending tags
    }

    handleTagSubmit(term) {
        
        if(!this.state.disableSearch) {
            this.props.history.push(`/search/${term}`)
        }
    }

    tagSearch = (term) => {
        axios
            .get(`/api/check-tag/${term}`)
            .then((res) => {
                if(res.data) {
                    this.setState({ disableSearch: false });
                } else {
                    this.setState({ disableSearch: true });
                }
            });
    }

    render() {
        return (
            <Row>
                <Col sm={7} className="leftColumn">
                    <div className="wrapper">
                        <Logo />
                        <div className="tagSearchStyle">
                            <p><b>Search a tag: </b></p>
                            <SearchBar 
                                handleOnSubmit={this.handleTagSubmit}
                                onSearchTermChange={this.tagSearch} 
                                isDisabled={this.state.disableSearch}
                                />
                        </div>
                    </div>
                </Col>
                <Col sm={5} className="rightColumn">
                    <div className="wrapper">
                    <Tags 
                        tagList={this.state.tags}
                        withHash={true}
                        isLink={true}
                    >
                        <h3>Trending Tags:</h3>
                    </Tags>
                    <NavBtn route='/' btnText='back' />
                    </div>
                </Col>
            </Row>
        )
    }
}
   
export default withRouter(ExploreSearch);