const router = require("express").Router();
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const { User, Thought } = require("../../models");

//! http://localhost:3001/api/users

// GET http://localhost:3001/api/users/   should return all users
router.get("/", (req, res) => {
	User.find({})
		.populate({ path: "thoughts", select: "-__v" })
		.populate({ path: "friends", select: "-__v" })
		.select("-__v") // exclude the document version
		.sort({ username: 1 }) // sort by createdAt in descending order
		.then((dbUserData) => res.json(dbUserData))
		.catch((err) => {
			console.log(err);
			res.status(400).json(err);
		});
});

// GET http://localhost:3001/api/users/:id   should return a single user by its _id and populated thought and user data
router.get("/:id", async (req, res) => {
	User.findOne({ _id: req.params.id })
		.populate({ path: "thoughts", select: "-__v" })
		.populate({ path: "friends", select: "-__v" })
		.select("-__v") // exclude the document version
		.then((dbUserData) => res.json(dbUserData))
		.catch((err) => {
			console.log(err);
			res.status(400).json(err);
		});
});

router.post('/', (req, res) => {
	Thought.create(req.body)  // create a new thought
        .then((thought) => {
            return User.findOneAndUpdate( // find the user by username and push the thought's _id to the user's thoughts array
                { username: req.body.username },
                { $push: { thoughts: thought._id } },
                { new: true }
            );
        })
        .then((user) =>
            !user
            ? res.status(404).json({ message: 'No user with that username' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
});


// POST http://localhost:3001/api/users/ should create a new user






module.exports = router;