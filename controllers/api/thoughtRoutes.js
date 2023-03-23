const router = require("express").Router();
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const { User, Thought } = require("../../models");

//! ==================== THOUGHT ROUTES ====================
//! http://localhost:3001/api/thoughts

//! GET http://localhost:3001/api/thoughts/   should return all thoughts
router.get("/", (req, res) => {
	Thought.find({})
		.select("-__v") // exclude the document version
		.sort({ createdAt: -1 }) // sort by createdAt in descending order
		.then((allUserData) => res.json(allUserData))
		.catch((err) => { res.status(400).json(err) });
});

//! GET http://localhost:3001/api/thoughts/:id   should return a single thought by its _id and populated thought and user data
router.get("/:id", (req, res) => {
	Thought.findOne({ _id: req.params.id })
		.select("-__v") // exclude the document version
		.then((userData) =>	userData
			? res.json(userData)
			: res.status(404).json({ message: "Thought not found" })
		)
		.catch((err) => { res.status(400).json(err) });
});

//! POST http://localhost:3001/api/thoughts/
router.post("/", (req, res) => {
	/* needs this json format in insomnia
		{
			"username": "the user name here",
			"thoughtText": "some text here"
		}
	 */
	Thought.create(req.body) // create a new thought
		.then((thought) => {
			return User.findOneAndUpdate(
				// find the user by username and push the thought's _id to the user's thoughts array
				{ username: req.body.username },
				{ $push: { thoughts: thought._id } },
				{ new: true }
			);
		})
		.then((user) =>	
			! user
			? res.status(404).json({ message: "No user with that username" })
			: res.json(user)
		)
		.catch((err) => res.status(500).json(err));
});

//! PUT http://localhost:3001/api/thoughts/:id
router.put("/:id", (req, res) => {
	/* needs this json format in insomnia
		{
			both of these values are optional if you only want to update one
			"thoughtText": "change this value is you want to",
			"username": "change this value is you want to"
		}
	*/
	Thought.findOneAndUpdate(
		{ _id: req.params.id },
		{
			username: req.body.username,
			thoughtText: req.body.thoughtText
		},
		{ new: true }
	)
		.then((thought) => 
			! thought
			? res.status(404).json({ message: "No thought with that ID" })
			: res.json(thought)
		)
		.catch((err) => res.status(500).json(err));
}),

//! DELETE http://localhost:3001/api/thoughts/:id
router.delete("/:id", (req, res) => {
	Thought.findOneAndDelete({ _id: req.params.id })
		.then((thought) => {
			return User.findOneAndUpdate(
				// this pulls the thought's _id from the user's thoughts array
				{ username: thought.username },
				{ $pull: { thoughts: thought._id } },
				{ new: true }
			);
		})
		.then((user) => res.json(user))
		.catch((err) => res.status(500).json(err));
}),



module.exports = router;
