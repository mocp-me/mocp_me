import React, { Component } from 'react';
import domtoimage from 'dom-to-image';
import _ from 'lodash';


import mocp from './mocp.png';
import me from './me.png';

class Downloader extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    componentDidMount() {
        console.log('history', this.props.history)
        let prevState = localStorage.getItem('prevState');
        prevState = JSON.parse(prevState);
        this.setState(prevState);
    }

    handleOnClick () {
        domtoimage.toJpeg(document.getElementById('user-image'))
        .then(function (dataUrl) {
            const link = document.createElement('a');
            link.download = 'mocpme.jpeg';
            link.href = dataUrl;
            link.click();
        });
    }

    render(){
        return (
                <div style={{width: '800px', textAlign: 'center', fontSize: '51.375px'}}> 
                    <div id="user-image" style={{height: '500px', width: '800px', position: 'relative'}}>
                        <img style={{position: 'absolute', top: '0', left: '0', height: '100px', width: '150px', opacity: '0.9'}} src={mocp} />
                        <img style={{height: '500px', width: '400px'}} src={this.state.returnedImg} />
                        <img style={{height: '500px', width: '400px'}} src={this.state.uploadedImg} />
                        <img style={{position: 'absolute', bottom: '0', right: '0', height: '100px', width: '150px', opacity: '0.5'}}  src={me} />
                    </div>
                    <button onClick={this.handleOnClick}>Save</button> 
                </div>
        )
    }
}

export default Downloader;