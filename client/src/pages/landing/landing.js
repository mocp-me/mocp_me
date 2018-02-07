import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import upload from 'superagent';

import Logo from '../../components/logo/logo';
import Phone from '../../components/phone/phone';
import NavPanel from '../../components/nav_panel/nav_panel';
import NavButton from '../../components/nav_button/nav_button';

import {Grid, Row, Col, Container, Clearfix} from 'react-grid-system';


const landingWrapper = {
    background:'black',
    height:'100vh',
    overflowY:'none'
}
const navPanel_1 = {
    backgroundColor: '#FFDC65',
    color:'#E5B616',
}
const navPanel_2 = {
    backgroundColor: '#E5B616',
    color:'#FFDC65',
}
const butt_1 = {
    background:'none',
    borderColor:'#E5B616',
    color:'#E5B616',
    borderRadius:'25px',
    borderWidth:'1.5px',
    paddingLeft:'20px',
    paddingRight:'18px',
    paddingTop:'10px',
    paddingBottom:'10px',
    marginTop:'10px'
}
const butt_2 = {
    background:'none',
    borderColor:'#FFDC65',
    color:'#FFDC65',
    borderRadius:'25px',
    borderWidth:'1.5px',
    paddingLeft:'20px',
    paddingRight:'18px',
    paddingTop:'10px',
    paddingBottom:'10px',
    marginTop:'10px'
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
        console.log(file[0])
        upload.post('/upload')
            .attach(file[0])
            .end((err, res) => {
                if(err) console.log(err);
                console.log('file uploaded')
                })
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
            <div style={landingWrapper}>
                <Row>
                    <Col xs={12} sm={8} md={7}>
                        <Logo />
                        <Phone />
                    </Col>
                    <Col xs={12} sm={4} md={5}>
                        <Dropzone 
                            onDrop={this.onDrop}
                            multiple={false}
                            style={{position: "relative"}}
                            accept="image/*"
                            onDrop={this.onDrop.bind(this)}
                            onDragEnter={this.onDragEnter.bind(this)}
                            onDragLeave={this.onDragLeave.bind(this)}>
                                { dropzoneActive && <div style={overlayStyle}></div> }
                                <NavPanel style={ navPanel_1}
                                    imgSrc="https://picsum.photos/190/190?random"
                                    text1="Upload your image"
                                    text2="to connect to"
                                    text3="the collection."
                                    style={ navPanel_1 }>
                                    <NavButton 
                                    buttonText='add image' 
                                    style = { butt_1 } />
                                </NavPanel>
                        </Dropzone>
                        <NavPanel
                            imgSrc="https://picsum.photos/190/190?random"
                            text1="Search our tags"
                            text2="& add some more"
                            text3="on the go!"
                            style={ navPanel_2 }>
                                <Link to='/explore'>
                                    <NavButton 
                                        buttonText='explore'
                                        style = { butt_2 }/>
                                </Link>
                        </NavPanel>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Landing;