import React, { Component } from 'react';
import axios from 'axios';
import domtoimage from 'dom-to-image';
import _ from 'lodash';


import Logo from '../../components/logo/logo';
import Info from '../../components/returned_info/returned_info';
import Tags from '../../components/tag_list/tag_list';
import TagSubmit from '../../components/tag_submit/tag_submit';

/*****      Notes possible routing solutions ***** 
    removing the upload delete function from the backend will make this page work
    even when a user navigate back and forward in the browser. Is it better to recall the api 
    every time and find a new place to delete the uplaoded file, or would it be better to store the api return
    in location state so we can recall it if user comes back to the page??
    In that case, we'd have to store a lot of data in location.state and change all of our condition rendering.. this also seems
    to defeats the purpose of the component state in that case. 
    First option seems like the way to go, but then where do we put the delete for the uploaded file?? 
    Also, in that case we may then want to disable navigation back to the 'download' page pending the new api call in the case
    that a user makes it to downloads and then navigations back to results  
*****/

class VisionResultsDesktop extends Component {
    constructor(props) {
        super(props)

        this.handleOnClick = this.handleOnClick.bind(this);

        this.state = { uploadedImg : this.props.location.state.filePath };
    }
  
    componentDidMount() {
        window.onpopstate = this.handlePopState;
        this.applyParams();
      }
    
    componentWillUnmount() {
        window.onpopstate = null;
      }
    
    shouldComponentUpdate(nextProps) {
        return _.isEqual(this.props.location, nextProps.location);
      }
    
    handlePopState = (event) => {
        event.preventDefault();
        this.applyParams();
      }
    
    applyParams() {
        console.log('applyParams location state', this.props.location.state)
        this.params = this.props.location.state || {};
        if(!this.props.location.state.returnedImg){
            this.fetchImage();
        }
      }
    
    handlePageChange = (page) => {
        console.log('handlePageChange location state', this.props.location.state)
        this.params.page = page;
        this.props.history.push('/', this.params);
        if(!this.props.location.state.returnedImg){
            this.fetchImage();
        }
      }
    handleOnClick() {
        this.props.history.push({
            pathname: `/download`,
            state: { 
                uploadedImg: this.state.uploadedImg,
                returnedImg: this.state.returnedImg
            }
        })
    }
    fetchImage() {
        const { fileName } = this.props.match.params;
        axios
            .get(`/api/vision/${fileName}`)
            .then((res) => {
                const returnedTags = [];
                res.data.Tags.map(tag => returnedTags.push(tag.tag_name));
                this.setState({ 
                    title : res.data.title,
                    artist : res.data.artist,
                    visionTopTags : res.data.visionTopTags,
                    returnedTags,
                    returnedImg: res.data.web_path
                })
            })
            .catch(err => console.log(err));
    }
    render() {
        const { title, artist, visionTopTags, returnedImg, returnedTags } = this.state;
        return (
            <div id="my-node">
                <div style={{ backgroundColor: 'black', color: 'white' }}>
                    <Logo />
                    { visionTopTags ? <Tags tagList={ visionTopTags } /> : null }
                </div> 
                <img src={ this.state.uploadedImg } />
                { returnedImg ? <img src={ returnedImg } /> : <div>Loading...</div> }
                <Info 
                    title={ title ? title : 'Loading...' }
                    artist={ artist ? artist : 'Loading...' }
                >
                    { returnedTags ? <Tags withHash={ true } tagList={ returnedTags } /> : <div>Loading...</div> }
                    <p>add a tag: </p>
                    <TagSubmit imageRef={ returnedImg && returnedImg } />
                    { returnedImg && <button onClick={this.handleOnClick} style={{fontSize: '50px'}}>download</button> }
                </Info>
            </div>
        );  
    }
}

export default VisionResultsDesktop;