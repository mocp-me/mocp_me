import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import DesktopLanding from './pages/desktop_landing/desktop_landing';

const App = () => 
	<div>
		<Router>
			<Switch>
				<Route path="/" component={DesktopLanding} />
			</Switch>
		</Router>
	</div>

export default App;
