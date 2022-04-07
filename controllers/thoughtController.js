const { User, Thought } = require("../model");
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
							{ $addToSet: { thoughts: thought._id } },
							{ new: true }
					  )
			)
			.catch((err) => {
				console.log(err);
				return res.status(500).json(err);
			});
	},
	// Delete a Thought
	deleteThought(req, res) {
		Thought.findOneAndRemove({ _id: req.params.thoughtId })
			.then((thought) =>
				!thought
					? res.status(404).json({ message: "No thought with that ID" })
					: User.findOneAndUpdate(
							{ thoughts: req.params.thoughtId },
							{ $pull: { thoughts: req.params.thoughtId } },
							{ new: true }
					  )
			)
			.then(() => res.json({ message: "thought deleted" }))
			.catch((err) => res.status(500).json(err));
	},
	// Update a User
	updateThought(req, res) {
		Thought.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $set: req.body },
			{ runValidators: true, new: true }
		)
			.then((thought) =>
				!thought
					? res.status(404).json({ message: "No thought with this id!" })
					: res.json(thought)
			)
			.catch((err) => res.status(500).json(err));
	},
	// post a reaction
	addReaction(req, res) {
		console.log("You are adding a reaction!");
		console.log(req.body);
		Thought.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $addToSet: { reactions: req.body } },
			{ new: true }
		)
			.then((thought) =>
				!thought
					? res.status(404).json({ message: "No thought found." })
					: res.json(thought)
			)
			.catch((err) => res.status(500).json(err));
	},
	// delete a reaction
	deleteReaction(req, res) {
		Thought.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $pull: { reactions: { reactionId: req.params.reactionId } } },
			{ new: true }
		)
			.then((thought) =>
				!thought
					? res.status(404).json({ message: "No thought found." })
					: res.json(thought)
			)
			.catch((err) => res.status(500).json(err));
	},
};
