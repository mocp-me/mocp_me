import history from "../history";
import auth0 from "auth0-js";

export default class Auth {
	constructor (){
		this.REACT_APP_AUTH0_CLIENT_ID = process.env.REACT_APP_AUTH0_CLIENT_ID;
		this.REACT_APP_AUTH0_AUDIENCE = process.env.REACT_APP_AUTH0_AUDIENCE;
		this.REACT_APP_AUTH0_REDIRECT_URL = process.env.REACT_APP_AUTH0_REDIRECT_URL;

	    this.login = this.login.bind(this);
	    this.logout = this.logout.bind(this);
	    this.handleAuthentication = this.handleAuthentication.bind(this);
	    this.isAuthenticated = this.isAuthenticated.bind(this);

		this.auth0 = new auth0.WebAuth({
			domain: "mocp-me.auth0.com",
			clientID: this.REACT_APP_AUTH0_CLIENT_ID,
			redirectUri: this.REACT_APP_AUTH0_REDIRECT_URL,
			audience: this.REACT_APP_AUTH0_AUDIENCE,
			responseType: "token id_token",
			scope: "openid"
		});
	}
	handleAuthentication() {
		this.auth0.parseHash((err, authResult) => {
			if (authResult && authResult.accessToken && authResult.idToken) {
				this.setSession(authResult);
				history.replace('/home');
			} else if (err) {
				history.replace('/home');
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
		history.replace('/home');
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
		return new Date().getTime() < expiresAt;
	}
	
	login() {
		this.auth0.authorize();
	}
}




