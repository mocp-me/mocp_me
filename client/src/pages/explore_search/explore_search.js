import React, { Component } from 'react';
import {Grid, Row, Col, Container} from 'react-grid-system';

import Logo from '../../components/logo/logo';
import TagSearch from '../../components/tag_search/tag_search';
import Trending from '../../components/trending/trending';

const leftColumn = {
    background: '#FFDC65',
    height:'100vh',
    color: '#E5B616',
    font:'avenir'
}

const tagSearchStyle = {
    paddingLeft:'15vw'
}

const rightColumn = {
    background:'#E5B616',
    height:'100vh',
    padding:'10vh',
    paddingTop:'9vh',
    color:'#FFDC65'
}

const pagePadding = {
    paddingTop:'25vh'
}

class ExploreSearch extends Component {

    render() {
        return (
            <Row>
                <Col sm={7} style={ leftColumn }>
                    <div style={ pagePadding }>
                        <Logo />
                        <div style={ tagSearchStyle }>
                            <TagSearch />
                        </div>
                    </div>
                </Col>
                <Col sm={5} style={ rightColumn }>
                    <div style={ pagePadding }>
                        <Trending />
                    </div>
                </Col>
            </Row>
        )
    }
}
   
export default ExploreSearch;