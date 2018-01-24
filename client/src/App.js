import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import DesktopLanding from './pages/desktop_landing/desktop_landing';
import MobileLanding from './pages/mobile_landing/mobile_landing';
import DesktopExplore from './pages/explore_desktop/explore_desktop';

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

		if(isMobile) {
			return (
				<div>
					<Router>
						<Switch>
							<Route path="/" component={MobileLanding} />
						</Switch>
					</Router>
				</div>
			);
		} else {
			return (
				<div>
					<Router>
						<Switch>
							<Route path="/explore" component={DesktopExplore} />
							<Route path="/" component={DesktopLanding} />
						</Switch>
					</Router>
				</div>
			);
		}
	}
} 

export default App;
