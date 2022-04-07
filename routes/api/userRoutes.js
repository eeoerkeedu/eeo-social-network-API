const router = require("express").Router();

const {
	getUsers,
	getSingleUser,
	createUser,
	updateUser,
	deleteUser,
} = require("../../controllers/userController.js");

// get all users, post a new user
router.route("/").get(getUsers).post(createUser);

// get one user and their thoughts and their friends list, update a user, delete a user
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

module.exports = router;
