import React, { Component } from 'react';
import axios from 'axios';

class Submit extends Component {
    handleOnClick() {
        const { uploadedImg, returnedImg } = JSON.parse(sessionStorage.getItem('prevState'));
        const toSubmit = {
            uploadedImg,
            returnedImg
        }
        console.log(toSubmit)
        axios
            .post('/api/submit-photo', toSubmit)
            .then(res => console.log('response: ', res))
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