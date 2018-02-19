import React, { Component } from 'react';

//this can't be a functional component or else refs wont work
class TagSubmit extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div className="search-wrapper">
                <form
                    ref={this.props.inputRef} 
                    onSubmit={ this.props.handleTagSubmit }>
                    <input 
                        className="formSubmitStyle"
                        type="text"
                        name="term" />
                    <input type="submit" value={this.props.btnText}/>
                </form>
            </div>
        )
    }
}

export default TagSubmit;