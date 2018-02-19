import React, { Component } from 'react';
import axios from 'axios';

import ErrorMessage from '../../components/input_error/input_error';
import './submit_style.css'

class Submit extends Component {
<<<<<<< HEAD
    constructor() {
        super();
        this.state = {};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    stringifyFormData(formData) {
        const data = {};
          for (let key of formData.keys()) {
            data[key] = formData.get(key);
        }
        return JSON.stringify(data, null, 2);
      }

      inputParsers = {
    date(input) {
      const split = input.split('/');
      const day = split[1]
      const month = split[0];
      const year = split[2];
      return `${year}-${month}-${day}`;
    }
  }
  
    handleSubmit(event) {
      event.preventDefault();
      if (!event.target.checkValidity()) {
          this.setState({
          invalid: true,
          displayErrors: true,
        });
        return;
      }
      const form = event.target;
      const data = new FormData(form);
  
      for (let name of data.keys()) {
        const input = form.elements[name];
        const parserName = input.dataset.parse;
        console.log('parser name is', parserName);
        if (parserName) {
          const parsedValue = this.inputParsers[parserName](data.get(name))
          data.set(name, parsedValue);
        }
      }
      
      this.setState({
          res: this.stringifyFormData(data),
        invalid: false,
        displayErrors: false,
      });
  
      // fetch('/api/form-submit-url', {
      //   method: 'POST',
      //   body: data,
      // });
    }
  
=======
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
>>>>>>> master
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