import React, { Component } from 'react';

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

 /* TagSubmit is being used for both search and post, when being used as post we'll pass a reference to the image as props, so when we submit
    a tag, we're also submitting a reference to the appropriate image */

class TagSubmit extends Component {

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
                <form onSubmit={this.props.handleFormSubmit || this.handleFormSubmit.bind(this)}>
                    <input style={ formSubmitStyle }
                    type="text"
                    name="term"
                    />
                </form>
            </div>
        )
    }
}

export default TagSubmit;