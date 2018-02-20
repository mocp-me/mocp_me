import React, { Component } from 'react';
import axios from 'axios';

import ErrorMessage from '../../components/input_error/input_error';
import './submit_style.css'

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
        const { res, invalid, displayErrors } = this.state;
      return (
          <div className="userSubmitWrapper">
          <form
            id='userSubmitForm'
            className={displayErrors ? 'displayErrors' : ''}
            onSubmit={this.handleSubmit}
            noValidate
           >
            <label htmlFor="name">Name:</label>
            <input
                className="userSubmitInput"
                id="name"
                name="name"
                type="text"
                data-parse="uppercase"
            />
  
            <label htmlFor="email">Email:</label>
            <input
                className="userSubmitInput" 
                id="email" 
                name="email" 
                type="email" 
                required />
  
            <button  className="userSubmitButton">
                Send it!
            </button>
          </form>
     
          <div className="errorBlock">
            {invalid && (
              <ErrorMessage text="Something doesn't seem quit right" />
            )}
            {!invalid && res && (
                <div>
                <h3>Transformed data to be sent:</h3>
                <pre>FormData {res}</pre>
                </div>
            )}
          </div>
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