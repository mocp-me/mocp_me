import React, { Component } from 'react';

class Image extends Component {
    render() {
        return (
            <div className="image-wrapper">
                <img src={this.props.source}/>
            </div>
        )
    }
}

export default Image;