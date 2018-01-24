import React, { Component } from 'react';

class TagSearch extends Component {
    constructor(props){
        super(props);

        this.state = {searchTerm : ''}
    }

    onInputChange(searchTerm) {
        this.setState({searchTerm})
    }

    render() {
        return (
            <div className="search-wrapper">
                <p>Search a tag: </p>
                <input
                value={this.state.searchTerm}
                onChange={event => this.onInputChange(event.target.value)}
                />
            </div>
        )
    }
}

export default TagSearch;