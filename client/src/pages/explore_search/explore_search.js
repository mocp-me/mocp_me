import React, { Component } from 'react';
import {Grid, Row, Col, Container} from 'react-grid-system';
import { withRouter } from 'react-router-dom';


import Logo from '../../components/logo/logo';
import TagSubmit from '../../components/tag_submit/tag_submit';
import Tags from '../../components/tag_list/tag_list';

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
    constructor(props){
        super(props);

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormSubmit(event) {
        event.preventDefault();
        const term = event.target.elements.term.value;
        this.props.history.push(`/search/${term}`)
    }
    render() {
        return (

            <Row>
                <Col sm={7} style={ leftColumn }>
                    <div style={ pagePadding }>
                        <Logo />
                        <div style={ tagSearchStyle }>
                            <p><b>Search a tag: </b></p>
                            <TagSubmit handleFormSubmit ={this.handleFormSubmit}/>
                        </div>
                    </div>
                </Col>
                <Col sm={5} style={ rightColumn }>
                    <div style={ pagePadding }>
                    <Tags hash={true}>
                        <h3>Trending Tags:</h3>
                    </Tags>
                    </div>
                </Col>
            </Row>
        )
    }
}
   
export default withRouter(ExploreSearch);