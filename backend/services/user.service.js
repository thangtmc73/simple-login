const DbMixin = require("../mixins/db.mixin");
const jwt = require("jsonwebtoken");
const { ErrorCode, getErrorMessage } = require("../errorCode");

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
				try {
					const code = await this.validateUser(username, password);
					return {
						returncode: code,
						returnmessage: getErrorMessage(code),
						token: this.generateJWT(username),
					};
				} catch (errorCode) {
					return {
						returncode: errorCode,
						returnmessage: getErrorMessage(errorCode),
					};
				}
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
		generateJWT(userName) {
			const today = new Date();
			const exp = new Date(today);
			exp.setDate(today.getDate() + 30);

			return jwt.sign({
				username: userName,
				exp: Math.floor(exp.getTime() / 1000)
			}, this.settings.JWT_SECRET_KEY);
		},
		async validateUser(userName, password) {
			const matchUsers = await this.adapter.find({ query: { username: userName } });
			if (!Array.isArray(matchUsers) || !matchUsers.length) {
				throw ErrorCode.UserNameNotExist;
			}
			const [user] = matchUsers;
			if (password !== user.password) {
				throw ErrorCode.PasswordWrong;
			}
			return ErrorCode.Success;
		}
	},
};