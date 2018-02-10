import React, { Component } from 'react';

class Callback extends Component {
	componentWillMount () {
		const hash = window.location.hash || null;
		console.log('callback hash', hash);
	}

  render() {
    return (
      <div>
      </div>
    );
  }
}

export default Callback;