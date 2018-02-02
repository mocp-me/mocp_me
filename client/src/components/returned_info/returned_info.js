import React, { Component } from 'react';

class Info extends Component {
    render() {
        return (
            <div className="info-wrapper">
                <h3>{this.props.title}</h3>
                <h4>{this.props.artist}</h4>
                <a href={this.props.link}>more info</a>
                <hr />
                {this.props.tags.map(tag => <p>{`#${tag}`}</p>)}
            </div>
        )
    }
}

export default Info;