import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
// Normalizes CSS defaults in varying browsers
import { Normalize } from 'normalize-css';


import {Auth, history} from "./Auth/Auth";
// import history from "./history";

import Landing from './pages/landing/landing';
import ExploreSearch from './pages/explore_search/explore_search';
import SearchResultsDesktop from './pages/search_results_desktop/search_results_desktop';
import VisionResultsDesktop from './pages/vision_results_desktop/vision_results_desktop';
import Downloader from './pages/download_and_share/download_and_share';

import Admin from "./pages/admin/admin";
import Callback from "./components/callback/callback";


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
	render() {
		return (
			<div style={Normalize}>
				<Router history={history}>
					<Switch>
						<Route path="/search/:term" component={ SearchResultsDesktop } />
						<Route path="/vision_search/:fileName" component={ VisionResultsDesktop } />
						<Route path="/download" component={ Downloader } />
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
