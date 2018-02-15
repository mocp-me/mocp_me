import React, { Component } from 'react';
import {Grid, Row, Col, Container} from 'react-grid-system';
import { withRouter } from 'react-router-dom';
import Media from "react-media";

import Logo from '../../components/logo/logo';
import TagSubmit from '../../components/tag_submit/tag_submit';
import Tags from '../../components/tag_list/tag_list';


class ExploreSearch extends Component {
    constructor(props){
        super(props);
    
        this.handleFormSubmit = this.handleFormSubmit.bind(this);

        this.state = {tags : ['funny cat', 'cute cat','sad cat', 'dumb cat','doggos']}
    }

    componentWillMount () {
        //ajax call to get trending tags
    }

    handleFormSubmit(event) {
        event.preventDefault();
        const term = event.target.elements.term.value;
        this.props.history.push(`/search/${term}`)
    }
    render() {
        return (
            <Row>
                <Col sm={7} className="leftColumn">
                    <div className="wrapper">
                        <Logo />
                        <div className="tagSearchStyle">
                            <p><b>Search a tag: </b></p>
                            <TagSubmit handleFormSubmit ={this.handleFormSubmit}/>
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
                    </div>
                </Col>
            </Row>
        )
    }
}
   
export default withRouter(ExploreSearch);