import history from "../history";
import auth0 from "auth0-js";

class Auth {
	auth0 = new auth0.WebAuth({
			domain: process.env.REACT_APP_AUTH0_CLIENT_DOMAIN,
			clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
			redirectUri: process.env.REACT_APP_AUTH0_REDIRECT_URL,
			audience: process.env.REACT_APP_AUTH0_AUDIENCE,
			responseType: "token id_token",
			scope: "openid"
		});

	constructor (){
	    this.login = this.login.bind(this);
	    this.logout = this.logout.bind(this);
	    this.handleAuthentication = this.handleAuthentication.bind(this);
	    this.isAuthenticated = this.isAuthenticated.bind(this);
	    this.history = history;
	}

	login() {
	    this.auth0.authorize();
	  }

	handleAuthentication() {
		this.auth0.parseHash((err, authResult) => {
			if (authResult && authResult.accessToken && authResult.idToken) {
				this.setSession(authResult);
				this.history.replace('/admin');
			} else if (err) {
				this.history.replace('/');
				console.log(err);
			}
		});
	}

	setSession(authResult) {
		// Set the time that the access token will expire at
		let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
		localStorage.setItem('access_token', authResult.accessToken);
		localStorage.setItem('id_token', authResult.idToken);
		localStorage.setItem('expires_at', expiresAt);
		// navigate to the home route
		history.replace('/admin');
	}

	logout() {
		// Clear access token and ID token from local storage
		localStorage.removeItem('access_token');
		localStorage.removeItem('id_token');
		localStorage.removeItem('expires_at');
		// navigate to the home route
		history.replace('/home');
	}

	isAuthenticated() {
		// Check whether the current time is past the 
		// access token's expiry time
		let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
		console.log('expiresAt', expiresAt);
		return new Date().getTime() < expiresAt;
	}
	
}

export {Auth, history}

