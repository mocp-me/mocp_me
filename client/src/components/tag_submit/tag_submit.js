import React, { Component } from 'react';

 /* TagSubmit is being used for both search and post, when being used as post we'll pass a reference to the image as props, so when we submit
    a tag, we're also submitting a reference to the appropriate image */

class TagSubmit extends Component {
    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
    }

    handleFormSubmit(event) {
        event.preventDefault();
        const term = event.target.elements.term.value;
        const imageRef = this.props.imageRef;
        //make a post with these!
        console.log(term, imageRef)

    }
    render() {
        return (
            <div className="search-wrapper">
                <form onSubmit={this.props.handleFormSubmit || this.handleFormSubmit}>
                    <input className="formSubmitStyle"
                    type="text"
                    name="term"
                    />
                </form>
            </div>
        )
    }
}

export default TagSubmit;