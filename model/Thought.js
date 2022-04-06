const { Schema, model } = require("mongoose");

// building the thoughts model
const thoughtSchema = new Schema(
	{
		thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },
		createdAt: { type: Date, default: Date.now },
		username: { type: String, required: true },
		reactions: [{ reactionSchema }],
	},
	{
		toJSON: {
			virtuals: true,
			getters: true,
		},
		id: false,
	}
);

// A friend count virtual that returns the length of the reactions the thought recieves.
thoughtSchema
	.virtual("reactionCount")
	// Getter
	.get(function () {
		return this.reactions.length;
	});

// Initialize our thoughts model
const Thought = model("thought", thoughtSchema);

module.exports = Thought;
