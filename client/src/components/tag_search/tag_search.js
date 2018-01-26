import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class TagSearch extends Component {
    constructor(props){
        super(props);
        //probably wont need this, but imma leave it just in case
        //we can do some cool stuff by updating state after each letter is entered
        this.state = {searchTerm : ''}
    }

    handleFormSubmit(event) {
        //look into react router 'redirect' and push for redirecting after submit
        event.preventDefault();
        const term = event.target.elements.term.value;
        this.props.history.push(`/search/${term}`)

    }

    render() {
        return (
            <div className="search-wrapper">
                <p>Search a tag: </p>
                <form onSubmit={this.handleFormSubmit.bind(this)}>
                    <input
                    type="text"
                    name="term"
                    />
                </form>
            </div>
        )
    }
}

export default withRouter(TagSearch);