const router = require("express").Router();
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const { User, Thought } = require("../../models");

//! http://localhost:3001/api/users

// GET ALL USERS http://localhost:3001/api/users/
router.get("/", (req, res) => {
	User.find({})
		.populate({ path: "thoughts", select: "-__v" })  // populate thought data for the users
		.populate({ path: "friends", select: "-__v" })  // populate friend data for the users
		.select("-__v") // exclude the document version
		.sort({ username: 1 }) // sort by createdAt in descending order
		.then((dbUserData) => res.json(dbUserData))
		.catch((err) => {
			console.log(err);
			res.status(400).json(err);
		});
});

// GET ONE USER http://localhost:3001/api/users/:id
router.get("/:id", async (req, res) => {
	User.findOne({ _id: req.params.id })  // find one user by its _id
		.populate({ path: "thoughts", select: "-__v" })  // populate thought data for the user 
		.populate({ path: "friends", select: "-__v" })  // populate friend data for the user 
		.select("-__v") // exclude the document version
		.then((dbUserData) => res.json(dbUserData))
		.catch((err) => {
			console.log(err);
			res.status(400).json(err);
		});
});

// POST NEW USER http://localhost:3001/api/users/  
router.post('/', (req, res) => {
	User.create(req.body)  // create a new user
	.then((user) => res.json(user))
	.catch((err) => res.status(500).json(err));
});




module.exports = router;