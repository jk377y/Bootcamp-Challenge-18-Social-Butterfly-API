const router = require("express").Router();
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const { User, Thought } = require("../../models");


//! http://localhost:3001/api/thoughts

// GET http://localhost:3001/api/thoughts/   should return all thoughts
router.get("/", (req, res) => {
	Thought.find({})
		.select("-__v") // exclude the document version
		.sort({ createdAt: -1 }) // sort by createdAt in descending order
		.then((allUserData) => res.json(allUserData))
		.catch((err) => {
			console.log(err);
			res.status(400).json(err);
		});
});

// GET http://localhost:3001/api/thoughts/:id   should return a single thought by its _id and populated thought and user data
router.get("/:id", (req, res) => {
	Thought.findOne({ _id: req.params.id })
		.select("-__v") // exclude the document version
		.then((userData) =>	userData 
			? res.json(userData) 
			: res.status(404).json({ message: "Thought not found" })
		)
		.catch((err) => {
			console.log(err);
			res.status(400).json(err);
		});
});

// POST http://localhost:3001/api/thoughts/ 
router.post('/', (req, res) => {
	/* needs this json format in insomnia
		{
			"username": "the user name here",
			"thoughtText": "some text here"
		}
	 */
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

module.exports = router;