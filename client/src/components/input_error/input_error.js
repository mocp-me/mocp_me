import React, { Component } from 'react';

import './error_animation.css';

class ErrorMessage extends Component {
    constructor() { 
        super(); 

        this.state = { key: 0 }; 
      }

    componentWillReceiveProps() {
    // update key to remount the component to rerun the animation
      this.setState({ key: ++this.state.key });
  }

  render() {
      return(
          <div key={this.state.key} className="bounce">{this.props.text}</div>
      ); 
  }
}

export default ErrorMessage;