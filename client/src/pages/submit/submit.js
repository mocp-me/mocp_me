import React, { Component } from 'react';
import axios from 'axios';

class Submit extends Component {
    handleOnClick() {
        const getState = JSON.parse(sessionStorage.getItem('prevState'));
        const toSubmit = {
            uploadedImg: getState.uploadedImg,
            returnedImg: getState.returnedImg
        }
        console.log(toSubmit)
        axios({
            method: 'post',
            url: '/api/submit',
            data: toSubmit
          }).then(res => console.log('response: ', res))
    }
    
    
    render() {
        return (
            <div>
                <div>Hi!</div>
                <button onClick={this.handleOnClick}>Save</button>
            </div>
        )
    }
}

export default Submit;