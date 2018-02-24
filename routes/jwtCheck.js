const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const path = require("path");

const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://mocp-me.auth0.com/.well-known/jwks.json"
    }),
    audience: "https://mocp-me.herokuapp.com/admin",
    issuer: "https://mocp-me.auth0.com/",
    algorithms: ['RS256']
});

module.exports = jwtCheck;