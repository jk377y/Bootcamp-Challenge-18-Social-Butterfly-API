const router = require('express').Router();
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const { User, Thought } = require('../../models');

//? ==================== USER ROUTES ====================
//! http://localhost:3001/api/users


//! GET http://localhost:3001/api/users/
router.get('/', (req, res) => {
	User.find({})
		.populate({ path: 'thoughts', select: '-__v' })  // populate thought data for the users
		.populate({ path: 'friends', select: '-__v' })  // populate friend data for the users
		.select('-__v') // exclude the document version
		.sort({ username: 1 }) // sort by createdAt in descending order
		.then((dbUserData) => res.json(dbUserData))
		.catch((err) => { res.status(400).json(err) });
});

//! GET http://localhost:3001/api/users/:id
router.get('/:id', async (req, res) => {
	User.findOne({ _id: req.params.id })  // find one user by its _id
		.populate({ path: 'thoughts', select: '-__v' })  // populate thought data for the user 
		.populate({ path: 'friends', select: '-__v' })  // populate friend data for the user 
		.select('-__v') // exclude the document version
		.then((dbUserData) => res.json(dbUserData))
		.catch((err) => { res.status(400).json(err)	});
});

//! POST http://localhost:3001/api/users/  
router.post('/', (req, res) => {
	/* needs this json format in insomnia
		{
			'username': 'enter a username',
			'email': 'that username's email address'
		}
	*/
	User.create(req.body)  // create a new user
	.then((user) => res.json(user))
	.catch((err) => res.status(500).json(err));
});

//! PUT http://localhost:3001/api/users/:id
router.put('/:id', (req, res) => {
	/* needs this json format in insomnia
		{ 
			both of these values are optional if you only want to update one
			'username': 'change this value is you want to',
			'email': 'change this value is you want to'
		}
	*/
	User.findOneAndUpdate(
		{ _id: req.params.id },
		{ 
			username: req.body.username,
			email: req.body.email
		},
		{ new: true }  // return the updated data
	)
	.then((user) =>
		!user
		? res.status(404).json({ message: 'There is no user with that ID' })
		: res.json(user)
	)
	.catch((err) => res.status(500).json(err));
}),

//! DELETE http://localhost:3001/api/users/:id
router.delete('/:id', (req, res) => {
	User.findOneAndDelete({ _id: req.params.id })  // deletes the user
        .then((user) =>
            ! user
            ? res.status(404).json({ message: 'There is no user with that ID' })
            : Thought.deleteMany({ _id: { $in: user.thoughts } })  // if user is deleted, then deletes all thoughts associated with the user
        )
        .then(() => res.json({ message: 'This user and their thoughts have been deleted.' }))
        .catch((err) => res.status(500).json(err));
}),

//? ==================== FRIEND ROUTES ====================
//! http://localhost:3001/api/users/:userId/friends/:friendId
router.post('/:userId/friends/:friendId', (req, res) => {
	// needs the user._id and friend's user._id in the url
	User.findOneAndUpdate(
		{ _id: req.params.userId },
		{ $addToSet: { friends: req.params.friendId } },
		{ new: true }  // return the updated data
	)
	.then((user) => 
		! user
		? res.status(404).json({ message: 'There is no user with that ID' })
		: res.json(user)
	)
	.catch((err) => res.status(500).json(err));
});

//! http://localhost:3001/api/users/:userId/friends/:friendId
router.delete('/:userId/friends/:friendId', (req, res) => {
	// needs the user._id and friend's user._id in the url
	User.findOneAndUpdate(
		{ _id: req.params.userId },  // user_id is the value of :userId in the url
		{ $pull: { friends: req.params.friendId } },  // takes the user_id (friendId in the url) and removes it from the friends array
		{ new: true }  // return the updated data
	)
	.then((user) =>
		!user
		? res.status(404).json({ message: 'There is no user with that ID' })
		: res.json(user)
	)
	.catch((err) => res.status(500).json(err));
}),

module.exports = router;