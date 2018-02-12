import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import upload from 'superagent';
import axios from 'axios';
import $ from 'jquery';



import Logo from '../../components/logo/logo';
import Phone from '../../components/phone/phone';
import NavPanel from '../../components/nav_panel/nav_panel';

import {Grid, Row, Col, Container, Clearfix} from 'react-grid-system';


// axios.defaults.headers.post['Content-Type'] = 'application/json';



var api_key = 'AIzaSyBY93fja8yxM9not6Nrd2v6NsRgNpJ4ZvM';
  //Grab the file and asynchronously convert to base64.
  function sendUploadedImage(imageInput) {
  var file = imageInput[0];
  var reader = new FileReader()
  reader.onloadend = processFile
  reader.readAsDataURL(file);
  console.log(reader); 
}

//Encodes the new base 64img
function processFile(event) {
  var encodedFile = event.target.result;
  console.log(encodedFile);
  sendFiletoCloudVision(encodedFile);
}

function sendFiletoCloudVision(file){
  var type = 'LABEL_DETECTION';
  //This will currently only allow jpeg images
  var fileType = file.split(',');
  fileType = fileType[0] + ",";
  console.log(fileType)
  var content = file.replace(fileType, "");
    // Strip out the file prefix when you convert to json.
    var json = {
     "requests": [
     { 
       "image": {
         "content": content 
       },
       "features": [
       {
         "type": type,
         "maxResults": 10
       }
       ]
     }
     ]
   }
    json = JSON.stringify(json)
  //Vision AJAX Request
  $.ajax({
    type: 'POST',
    url: "https://vision.googleapis.com/v1/images:annotate?key=" + api_key,
    dataType: 'json',
    data: json,
      //Include headers, otherwise you get an odd 400 error.
      headers: {
        "Content-Type": "application/json",
      },
      success: function(data, textStatus, jqXHR) {

        var tagsArray = [];
        for (var i = 0; i < data.responses[0].labelAnnotations.length; i++){
          //console.log(data.responses[0].labelAnnotations[i].description);
          tagsArray.push(data.responses[0].labelAnnotations[i].description);
        }

        //Gets the image for the top tag.
        //getURL(data.responses[0].labelAnnotations[0].description);
        // getURL(tagsArray)
        console.log(tagsArray)
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
      }
    });
}

class Landing extends Component { 
    constructor(props){
        super(props);

        this.state={ dropzoneActive: false }
    }

    onDragEnter() {
        this.setState(()=> { 
            return { dropzoneActive: true }
        });
      }
    
      onDragLeave() {
        this.setState(() => {
            return { dropzoneActive: false }
        });
      }

    onDrop(file) {
        this.setState(()=> {
            return { dropzoneActive: false}
        });
        console.log(file[0].preview)
        sendUploadedImage(file)
    }
    render(){
        const { file, dropzoneActive } = this.state;
        const overlayStyle = {
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          background: 'rgba(0,0,0,0.1)',
        };
        return (
            <div className="landingWrapper">
                <Row>
                    <Col xs={12} sm={7} md={7} className="phoneStyle">
                        <Logo />
                        <Phone />
                    </Col>
                    <Col xs={12} sm={5} md={5}>
                        <Dropzone 
                            onDrop={this.onDrop}
                            multiple={false}
                            style={{position: "relative"}}
                            accept="image/*"
                            onDrop={this.onDrop.bind(this)}
                            onDragEnter={this.onDragEnter.bind(this)}
                            onDragLeave={this.onDragLeave.bind(this)}>
                                { dropzoneActive && <div style={overlayStyle}></div> }
                                <div className="navPanel_1">
                                  <NavPanel
                                    imgSrc="https://picsum.photos/190/190?random"
                                    text1="Upload your image"
                                    text2="to connect to"
                                    text3="the collection."
                                  />
                                  <button className="button">
                                    add image
                                  </button>
                                </div>
                        </Dropzone>
                        <div className="navPanel_2">
                          <NavPanel
                            imgSrc="https://picsum.photos/190/190?random"
                            text1="Search our tags"
                            text2="& add some more"
                            text3="on the go!"
                            />
                            <Link to='/explore'>
                              <button className="button">
                                  explore
                              </button>
                            </Link>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Landing;