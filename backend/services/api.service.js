
"use strict";

const ApiGateway = require("moleculer-web");

module.exports = {
	name: "api",
	mixins: [ApiGateway],

	// More info about settings: http://moleculer.services/docs/moleculer-web.html
	settings: {
		port: process.env.PORT || 4000,

		routes: [{
			// Configures the Access-Control-Allow-Origin CORS header.
			origin: "*",
			path: "/api",
			whitelist: [
				// Access to any actions in all services
				"**"
			],
			autoAliases: true,
			// Use bodyparser modules
			bodyParsers: {
				json: true,
				urlencoded: { extended: true }
			},
			cors: {
				origin: ["http://localhost:3000", "https://localhost:4000"],
				methods: ["GET", "OPTIONS", "POST"],
				credentials: true
			},
		}]

	}
};
