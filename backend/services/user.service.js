// greeter.service.js
module.exports = {
	name: "user",

	actions: {
		login: {
			rest: {
				method: "POST",
				path: "/login",
			},
			params: {
				username: "string",
				password: "string"
			},
			async handler(ctx) {
				return `Welcome, ${ctx.params.username} with ${ctx.params.password}`;
			}
		},
	}
};