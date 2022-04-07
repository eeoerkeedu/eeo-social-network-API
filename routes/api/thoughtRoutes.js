const router = require("express").Router();

const {
	getThoughts,
	getSingleThought,
	createThought,
	updateThought,
	deleteThought,
	addReaction,
	deleteReaction,
} = require("../../controllers/thoughtController");

// get all Thoughts, post a new Thought
router.route("/").get(getThoughts).post(createThought);

// get one Thought, update a Thought, delete a Thought
router
	.route("/:thoughtId")
	.get(getSingleThought)
	.put(updateThought)
	.delete(deleteThought);

// post/add a reaction to a thought
router.route("/:thoughtId/reactions").post(addReaction);

// delete a reaction
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
