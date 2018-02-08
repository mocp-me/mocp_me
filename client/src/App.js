
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Normalizes CSS defaults in varying browsers
import { Normalize } from 'normalize-css';




import {Auth, history} from "./Auth/Auth";
// import history from "./history";

import Landing from './pages/landing/landing';
import ExploreSearch from './pages/explore_search/explore_search';
import SearchResultsDesktop from './pages/search_results_desktop/search_results_desktop';
import SearchResultsMobile from './pages/search_results_mobile/search_results_mobile';

import VisionResultsDesktop from './pages/vision_results_desktop/vision_results_desktop';
import VisionResultsMobile from './pages/vision_results_mobile/vision_results_mobile';

import Admin from "./pages/admin/admin";
import Callback from "./components/callback/callback";




//there are packages available that will instead detact device type, instead of rendering base on window width.. make be worth looking into 
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			width: window.innerWidth
		};
		
	}

	auth = new Auth();
	history = history;

	handleAuthentication ({location}) {
		if (/access_token|id_token|error/.test(location.hash)) {
		this.auth.handleAuthentication();
		}
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
				<Router history={history}>
					<Switch>
						<Route path="/search/:term" component={isMobile ? SearchResultsMobile : SearchResultsDesktop} />
						<Route path="/upload" component={isMobile ? VisionResultsMobile : VisionResultsDesktop} />
						<Route path="/explore" component={ExploreSearch} />
						<Route path="/admin" render={(props) => <Admin auth={this.auth} {...props} />} />
						<Route path="/callback" render={(props) => {
							this.handleAuthentication(props);
							return <Callback {...props} /> 
							}}/>
						<Route path="/" component={Landing} />
					</Switch>
				</Router>
			</div>
		);
	}
}

export default App;
