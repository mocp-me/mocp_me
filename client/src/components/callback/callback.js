import React, { Component } from 'react';
import loading from './loading.svg';

class Callback extends Component {
  render() {
    return (
      <div>
        <h1>Callback!</h1>
        <img src={loading} alt="loading"/>
      </div>
    );
  }
}

export default Callback;