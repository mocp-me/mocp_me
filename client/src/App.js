import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Normalizes CSS defaults in varying browsers
import { Normalize } from 'normalize-css';


import Landing from './pages/landing/landing';
import ExploreSearch from './pages/explore_search/explore_search';
import SearchResultsDesktop from './pages/search_results_desktop/search_results_desktop';
import SearchResultsMobile from './pages/search_results_mobile/search_results_mobile';
import VisionResultsDesktop from './pages/vision_results_desktop/vision_results_desktop';
import VisionResultsMobile from './pages/vision_results_mobile/vision_results_mobile';



//there are packages available that will instead detact device type, instead of rendering base on window width.. make be worth looking into 
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			width: window.innerWidth
		};
	}

	componentWillMount() {
		window.addEventListener('resize', this.handleSizeChange);
	};

	//need to take the event listener off of the window when not using
	componentWillUnmount() {
		window.removeEventListener('resize', this.handleSizeChange);
	};

	handleSizeChange = () => {
		this.setState({width: window.innerWidth});
	};

	render() {

		const { width } = this.state;
		const isMobile = width <= 500;

		return (
			<div style={Normalize}>
				<Router>
					<Switch>
						<Route path="/search/:term" component={isMobile ? SearchResultsMobile : SearchResultsDesktop} />
						<Route path="/upload" component={isMobile ? VisionResultsMobile : VisionResultsDesktop} />
						<Route path="/explore" component={ExploreSearch} />
						<Route path="/" component={Landing} />
					</Switch>
				</Router>
			</div>
		);
	}
}

export default App;
