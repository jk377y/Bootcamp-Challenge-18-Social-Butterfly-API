const router = require('express').Router();
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const { User, Thought } = require('../../models');

//? ==================== THOUGHT ROUTES ====================
//! http://localhost:3001/api/thoughts

//! GET http://localhost:3001/api/thoughts/   should return all thoughts
router.get('/', (req, res) => {
	Thought.find({})
		.select('-__v') // exclude the document version
		.sort({ createdAt: -1 }) // sort by createdAt in descending order
		.then((allUserData) => res.json(allUserData))
		.catch((err) => { res.status(400).json(err) });
});

//! GET http://localhost:3001/api/thoughts/:id   should return a single thought by its _id and populated thought and user data
router.get('/:id', (req, res) => {
	// need the thought_id in the url
	Thought.findOne({ _id: req.params.id })
		.select('-__v') // exclude the document version
		.then((userData) =>	userData
			? res.json(userData)
			: res.status(404).json({ message: 'Thought not found' })
		)
		.catch((err) => { res.status(400).json(err) });
});

//! POST http://localhost:3001/api/thoughts/
router.post('/', (req, res) => {
	/* needs this json format in insomnia
		{
			'username': 'the user name here',
			'thoughtText': 'some text here'
		}
	 */
	Thought.create(req.body) // create a new thought
		.then((thought) => {
			return User.findOneAndUpdate(
				// find the user by username and push the thought's _id to the user's thoughts array
				{ username: req.body.username },
				{ $addToSet: { thoughts: thought._id } },
				{ new: true }  // return the updated data
			);
		})
		.then((user) =>	
			! user
			? res.status(404).json({ message: 'There is no user with that username' })
			: res.json(user)
		)
		.catch((err) => res.status(500).json(err));
});

//! PUT http://localhost:3001/api/thoughts/:id
router.put('/:id', (req, res) => {
	// need the thought_id in the url
	/* needs this json format in insomnia
		{
			both of these values are optional if you only want to update one
			'thoughtText': 'change this value is you want to',
			'username': 'change this value is you want to'
		}
	*/
	Thought.findOneAndUpdate(
		{ _id: req.params.id },
		{
			username: req.body.username,
			thoughtText: req.body.thoughtText
		},
		{ new: true }  // return the updated data
	)
		.then((thought) => 
			! thought
			? res.status(404).json({ message: 'There is no thought with that ID' })
			: res.json(thought)
		)
		.catch((err) => res.status(500).json(err));
}),

//! DELETE http://localhost:3001/api/thoughts/:id
router.delete('/:id', (req, res) => {
	// need the thought_id in the url
	Thought.findOneAndDelete({ _id: req.params.id })
		.then((thought) => {
			return User.findOneAndUpdate(
				// this pulls the thought's _id from the user's thoughts array
				{ username: thought.username },
				{ $pull: { thoughts: thought._id } },
				{ new: true }  // return the updated data
			);
		})
		.then((user) => res.json(user))
		.catch((err) => res.status(500).json(err));
}),


//? ==================== REACTION ROUTES ====================
//! POST http://localhost:3001/api/thoughts/:id/reactions
router.post('/:id/reactions', (req, res) => {
	/* needs this json format in insomnia
		{
			'username': 'the user name here',
			'reactionBody': 'some text here'
		}
	*/
	Thought.findOneAndUpdate(  // find the thought by _id
		{id: req.params.id},
		{ $addToSet: { reactions: req.body } },  // push the reaction to the reactions array
		{ new: true }  // return the updated data
		)
		.then((thought) => 
			! thought
			? res.status(404).json({ message: 'There is no thought with that ID' })
			: res.json(thought)
		)
		.catch((err) => res.status(500).json(err));		
});

//! DELETE http://localhost:3001/api/thoughts/:id/reactions/:reactionId
router.delete('/:id/reactions/:reactionId', (req, res) => {
	// need the thought_id and the reaction_id in the url
	Thought.findOneAndUpdate(  // find the thought by _id
			{id: req.params.id},
			{ $pull: { reactions: { reactionId: req.params.reactionId } } },  // pull the reaction from the reactions array by reactionId
			{ new: true }  // return the updated data
		)
		.then((thought) => 
			! thought
			? res.status(404).json({ message: 'There is no thought with that ID' })
			: res.json(thought)
		)
		.catch((err) => res.status(500).json(err));
});

module.exports = router;