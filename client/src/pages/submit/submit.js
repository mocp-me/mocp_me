import React, { Component } from 'react';
import axios from 'axios';

class Submit extends Component {
    constructor(props) {
        super(props);
        
    }

    componentWillMount() {
        const check = !sessionStorage.getItem('prevState')
        if(!check.uploadedImg) {
            this.props.history.push('/')
        }
    }

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
                <div>Submit photo to MOCP</div>
                <button onClick={this.handleOnClick}>Submit</button>
            </div>
        );
    }
  }

export default Submit;




// handleOnClick() {
//     const getState = JSON.parse(sessionStorage.getItem('prevState'));
//     const toSubmit = {
//         uploadedImg: getState.uploadedImg,
//         returnedImg: getState.returnedImg
//     }
//     console.log(toSubmit)
//     axios({
//         method: 'post',
//         url: '/api/submit',
//         data: toSubmit
//       }).then(res => console.log('response: ', res))
// }