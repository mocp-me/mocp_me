import React, { Component } from 'react';
import {Grid, Row, Col, Container} from 'react-grid-system';
import { withRouter } from 'react-router-dom';
import Media from "react-media";

import Logo from '../../components/logo/logo';
import TagSubmit from '../../components/tag_submit/tag_submit';
import Tags from '../../components/tag_list/tag_list';


const leftColumn = {
    background: '#FFDC65',
    height:'100vh',
    color: '#E5B616',
    font:'avenir'
}

const tagSearchStyleSm = {
    paddingLeft:'9vw'
}
const tagSearchStyleLg = {
    paddingLeft:'16vw'
}

const rightColumnSm = {
    background:'#E5B616',
    height:'100vh',
    padding:'5vh',
    paddingTop:'10vh',
    color:'#FFDC65'
}
const rightColumnLg = {
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
                <Col sm={7} style={ leftColumn }>
                    <div style={ pagePadding }>
                        <Logo />
                        <Media query="(max-width: 800px)">
                            {matches =>
                                matches ? (
                                    <div style={ tagSearchStyleSm }>
                                        <p><b>Search a tag: </b></p>
                                        <TagSubmit handleFormSubmit ={this.handleFormSubmit}/>
                                    </div>
                                ) : (
                                    <div style={ tagSearchStyleLg }>
                                        <p><b>Search a tag: </b></p>
                                        <TagSubmit handleFormSubmit ={this.handleFormSubmit}/>
                                    </div>
                                )
                            }
                        </Media>
                    </div>
                </Col>
                <Media query="(max-width: 800px)">
                    {matches =>
                        matches ? (
                            <Col sm={5} style={ rightColumnSm }>
                                <div style={ pagePadding }>
                                <Tags 
                                    tagList={this.state.tags}
                                    withHash={true}
                                    isLink={true}
                                >
                                    <h3>Trending Tags:</h3>
                                </Tags>
                                </div>
                            </Col>
                        ) : (
                            <Col sm={5} style={ rightColumnLg }>
                                <div style={ pagePadding }>
                                <Tags 
                                    tagList={this.state.tags}
                                    withHash={true}
                                    isLink={true}
                                >
                                    <h3>Trending Tags:</h3>
                                </Tags>
                                </div>
                            </Col>
                        )
                    }
                </Media>
            </Row>
        )
    }
}
   
export default withRouter(ExploreSearch);