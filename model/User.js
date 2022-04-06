const { Schema, model } = require("mongoose");

//Building the user model
const userSchema = new Schema(
	{
		// accepts username, emails, an array for their thoughts posts, and an array for their list of friends.
		username: String,
		email: String,
		thoughts: [],
		friends: [],
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

const User = model("user", userSchema);

module.exports = User;
