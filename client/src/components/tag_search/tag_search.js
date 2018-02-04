import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

 const formSubmitStyle = {
    borderRadius:'25px',
    padding:'5px',
    paddingLeft:'15px',
    paddingRight:'15px',
    background:'#E5B616',
    border:'none',
    width:'272px',
    color:'#FFDC65'
 }

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
                <p><b>Search a tag: </b></p>
                <form onSubmit={this.handleFormSubmit.bind(this)}>
                    <input style={ formSubmitStyle }
                    type="text"
                    name="term"
                    />
                </form>
            </div>
        )
    }
}

export default withRouter(TagSearch);