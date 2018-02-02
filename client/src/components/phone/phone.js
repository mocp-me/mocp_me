import React, { Component } from 'react';
import About from '../about/about';
import {Grid, Row, Col, Container} from 'react-grid-system';
// import './phone.css';

const phoneWrapper = {
    marginTop:'0',
    width:'272px',
    height:'564px',
    borderRadius:'25px',
    background:'gray',
    paddingTop: '40px',
    marginLeft: '15vw',
    marginBottom:'7vh'
}
const phone ={
    marginLeft:'7px',
    marginRight:'7px',
    width:'258px',
    height:'475px',
    borderRadius:'4px',
    background:'black',
    color:'white',
    padding:'40px',
    paddingLeft:'25px',
    fontSize: '35px',
    font:'avenir',
    lineHeight:'1.25'
}

//   .speaker-circle{
//     width:10px;
//     height:10px;
//     margin-left: 50px;
//     border-radius:50px;
//     background-color: #404040;
//     transition:all .5s linear;
//     -webkit-transition:all linear .5s;
//   }


class Phone extends Component {
    constructor(props){
        super(props);
        this.state = {hovered: false}
    }

    handleOnMouseOver = () => {
        this.setState({hovered:true})
    }
    handleOnMouseLeave = () => {
        this.setState({hovered:false})
    }

    render() {
        return (
            <div style={phoneWrapper}  onMouseOver={this.handleOnMouseOver} onMouseLeave={this.handleOnMouseLeave}>                
                {/* determine what to render based on state */}
                {!this.state.hovered ? <div style={phone}>Tag the collection with machine learning & computer vision</div> : <About /> }
            </div>
        )
    }
}

export default Phone;


