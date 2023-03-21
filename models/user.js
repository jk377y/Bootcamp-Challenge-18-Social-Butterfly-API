const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			// match ([a-z0-9_\.-]+) matches any lowercase letter, number, underscore, period, or hyphen Ex. "james03_21_2023"
			// @ matches the @ symbol  Ex. "@"
			// ([\da-z\.-]+) matches any lowercase letter, number, period, or hyphen  Ex. "gmail"
			// \. matches the period  Ex. "."
			// ([a-z\.]{2,6}) matches any lowercase letter or period, and the length must be between 2 and 6 characters  Ex. "com"
			// james03_21_2023@gmail.com would be a valid email address
			match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/],
		},
		thoughts: [
			{
				type: Schema.Types.ObjectId,
				ref: "Thought",
			},
		],
		friends: [
			{
				type: Schema.Types.ObjectId,
				ref: "User",
			},
		],
	},
	{
		toJSON: {
			virtuals: true,
		},
		id: false,
	}
);

UserSchema.virtual("friendCount").get(function () {
	return this.friends.length;
});

const User = model("User", UserSchema);

module.exports = User;
