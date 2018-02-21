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
            type="text"
            value={this.state.term}
            onChange={event => this.onInputChange(event.target.value)}
             />
            <input type='submit' value={this.props.isDisabled ? 'x' : 'go'}/>
        </form>
    );
  }
}

export default SearchBar;
