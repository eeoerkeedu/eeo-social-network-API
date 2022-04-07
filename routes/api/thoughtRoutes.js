const router = require("express").Router();

const {
	getThoughts,
	getSingleThought,
	createThought,
	updateThought,
	deleteThought,
} = require("../../controllers/thoughtController");

// get all Thoughts, post a new Thought
router.route("/").get(getThoughts).post(createThought);

// get one Thought, update a Thought, delete a Thought
router
	.route("/:thoughtId")
	.get(getSingleThought)
	.put(updateThought)
	.delete(deleteThought);

module.exports = router;
