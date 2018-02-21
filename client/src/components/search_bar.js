import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: '' };
  }

  onInputChange(term) {
    this.setState({term});
    this.props.onSearchTermChange(term);
  }

  handleOnSubmit(event) {
        event.preventDefault()
        const term = this.state.term
        this.props.handleOnSubmit(term)
  }

  render() {
    return (
        <form
            onSubmit={event => this.handleOnSubmit(event)}>
          <input 
            className="searchBar"
            type="text"
            value={this.state.term}
            onChange={event => this.onInputChange(event.target.value)}
             />
            {/*<input type='submit' value={this.props.isDisabled ? 
              'sorry, we dont have that tag' : 
              'search it, girl!'
            }/>*/}
            {this.props.isDisabled ? 
              <div className="speechWrapper">
                <div className="triangle"></div>
                <div className="speechBubble">
                  <p>enter a</p>
                  <p>valid tag</p>
                </div>
              </div> : 
              <div className="speechWrapperHovered">
                <div className="triangle"></div>
                <div className="speechBubble">
                  <input type='submit' value={'Search it!'}/>
                </div>
              </div>
            }
        </form>
    );
  }



}

export default SearchBar;
