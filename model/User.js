const { Schema, model } = require("mongoose");

//Building the user model
const userSchema = new Schema(
	{
		// accepts username, emails, an array for their thoughts posts, and an array for their list of friends.
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
			match: [
				/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
				"invalid email entered",
			],
		},
		thoughts: [{ type: Schema.Types.ObjectId, ref: "Thought" }],
		friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
	},
	{
		// setting vituals to be included in response.
		toJSON: {
			virtuals: true,
		},
		id: false,
	}
);

// A friend count virtual that returns the length of the users friends list.
userSchema
	.virtual("friendCount")
	// Getter
	.get(function () {
		return this.friends.length;
	});

// Initialize our User model
const User = model("user", userSchema);

module.exports = User;
