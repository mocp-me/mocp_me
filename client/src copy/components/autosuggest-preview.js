import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import css from "./autosuggest.css";
import axios from "axios";

function escapeRegexCharacters(str) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
	const escapedValue = escapeRegexCharacters(value.trim());
  
	if (escapedValue === '') {
		return [];
	}

	const regex = new RegExp('\\b' + escapedValue, 'i');
  
	return this.tags.filter(tag => regex.test(getSuggestionValue(tag)));
}

function getSuggestionValue(suggestion) {
	return `${suggestion.first} ${suggestion.last}`;
}

function renderSuggestion(suggestion, { query }) {
	const suggestionText = `${suggestion.first} ${suggestion.last}`;
	const matches = AutosuggestHighlightMatch(suggestionText, query);
	const parts = AutosuggestHighlightParse(suggestionText, matches);

	return (
		<span className={'suggestion-content ' + suggestion.Photos}>
			<span className="name">
			{
				parts.map((part, index) => {
					const className = part.highlight ? 'highlight' : null;
					return (
						<span className={className} key={index}>{part.text}</span>
					);
				})
			}
			</span>
		</span>
	);
}

class SearchBar extends Component {
	constructor() {
		super();

		this.state = {
			value: '',
			suggestions: [],
			tags: []
		};    

		axios
			.get("/api/all-tags")
			.then(res => this.setState({tags: res}));
	}

	onChange = (event, { newValue, method }) => {
		this.setState({
			value: newValue
		});
	}

	onSuggestionsFetchRequested = ({ value }) => {
		this.setState({
			suggestions: getSuggestions(value)
		});
	}

	onSuggestionsClearRequested = () => {
		this.setState({
			suggestions: []
		});
	};

	render() {
		const { value, suggestions } = this.state;
		const inputProps = {
			placeholder: "Type 'c'",
			value,
			onChange: this.onChange
		}

		return (
			<Autosuggest 
			suggestions={suggestions}
			onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
			onSuggestionsClearRequested={this.onSuggestionsClearRequested}
			getSuggestionValue={getSuggestionValue}
			renderSuggestion={renderSuggestion}
			inputProps={inputProps} />
		);
	}
}

export default SearchBar;
