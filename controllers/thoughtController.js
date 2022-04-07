const { User, Thought } = require("../models");
const { post } = require("../routes/api");

module.exports = {
	// Get all Thoughts
	getThoughts(req, res) {
		Thought.find()
			.then((thought) => res.json(thought))
			.catch((err) => res.status(500).json(err));
	},
	// Get a thought
	getSingleThought(req, res) {
		Thought.findOne({ _id: req.params.thoughtId })
			.select("-__v")
			.then((thought) =>
				!thought
					? res.status(404).json({ message: "No thought with that ID" })
					: res.json(thought)
			)
			.catch((err) => res.status(500).json(err));
	},
	// Create a Thought
	createThought(req, res) {
		Thought.create(req.body)
			.then((thought) => res.json(thought))
			// adds the posted thought to the user's thoughts
			.then((thought) =>
				!thought
					? res.status(404).json({ message: "No such thought exists" })
					: User.findOneAndUpdate(
							{ _id: req.params.userId },
							{ $addToSet: { thoughts: req.params.thoughtId } },
							{ new: true }
					  )
			)
			.then((user) =>
				!user
					? res.status(404).json({ message: "No user found with that ID :(" })
					: res.json(user)
			)
			.catch((err) => {
				console.log(err);
				return res.status(500).json(err);
			});
	},
	// Delete a Thought
	deleteThought(req, res) {
		Thought.findOneAndDelete({ _id: req.params.thoughtId })
			.then((thought) =>
				!thought
					? res.status(404).json({ message: "No thought with that ID" })
					: res.json(thought)
			)
			.then(() => res.json({ message: "thought deleted" }))
			.catch((err) => res.status(500).json(err));
	},
	// Update a User
	updateUser(req, res) {
		User.findOneAndUpdate(
			{ _id: req.params.userId },
			{ $set: req.body },
			{ runValidators: true, new: true }
		)
			.then((user) =>
				!user
					? res.status(404).json({ message: "No user with this id!" })
					: res.json(user)
			)
			.catch((err) => res.status(500).json(err));
	},
};
