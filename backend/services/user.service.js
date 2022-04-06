const DbMixin = require("../mixins/db.mixin");
const jwt = require("jsonwebtoken");

module.exports = {
	name: "user",
	mixins: [DbMixin("users")],
	settings: {
		/** Public fields */
		JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || "simple-login-key",
		fields: ["returncode", "returnmessage"],
	},
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
				const { username, password } = ctx.params;
				const matchUsers =  await this.adapter.find({ query: { username } });
				if (!Array.isArray(matchUsers) || !matchUsers.length) {
					return { returncode: -1, returnmessage: "The user is not existed" };
				}
				const [user] = matchUsers;
				if (password !== user.password) {
					return { returncode: -2, returnmessage: "The password is wrong" };
				}
				return { returncode: 1, returnmessage: "Success", token: this.generateJWT(user) };
			}
		},
	},

	methods: {
		/**
		 * Loading sample data to the collection.
		 * It is called in the DB.mixin after the database
		 * connection establishing & the collection is empty.
		 */
		async seedDB() {
			await this.adapter.insertMany([
				{"username":"admin","password":"123456"},
				{"username":"thangtm","password":"654321"}
			]);
		},
		generateJWT(user) {
			const today = new Date();
			const exp = new Date(today);
			exp.setDate(today.getDate() + 30);

			return jwt.sign({
				id: user._id,
				username: user.username,
				exp: Math.floor(exp.getTime() / 1000)
			}, this.settings.JWT_SECRET_KEY);
		},
	},
};