const DbMixin = require("../mixins/db.mixin");
const { MoleculerError } = require("moleculer").Errors;

module.exports = {
	name: "user",
	mixins: [DbMixin("users")],
	settings: {
		/** Public fields */
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
				console.log("matchUsers", matchUsers);
				if (!Array.isArray(matchUsers) || !matchUsers.length) {
					return { returncode: -1, returnmessage: "The user is not existed" };
				}
				const [user] = matchUsers;
				if (password !== user.password) {
					return { returncode: -2, returnmessage: "The password is wrong" };
				}
				return { returncode: 1, returnmessage: "Success" };
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
		}
	},

};