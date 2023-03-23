const { Schema, model, Types } = require('mongoose');

const ReactionSchema = new Schema(
	{	
		_id: false,
		reactionId: {
			type: Schema.Types.ObjectId,
			default: () => new Types.ObjectId(),
		},
		reactionBody: {
			type: String,
			required: true,
			maxlength: 280,
		},
		username: {
			type: String,
			required: true,
		},
		createdAt: {
			type: Date,
			default: Date.now,
			//! may not be needed - test with/without
			set: (createdAtVal) => new Date(createdAtVal),
			get: (createdAtVal) => new Date(createdAtVal).toLocaleDateString('en-US'),
		},
	},
	{
		toJSON: {
			getters: true,
		},
	}
);

const ThoughtSchema = new Schema(
	{
		thoughtText: {
			type: String,
			required: true,
			minlength: 1,
			maxlength: 280,
		},
		createdAt: {
			type: Date,
			default: Date.now,
			//! may not be needed - test with/without
			set: (createdAtVal) => new Date(createdAtVal),
			get: (createdAtVal) => new Date(createdAtVal).toLocaleDateString('en-US'),
		},
		username: {
			type: String,
			required: true,
		},
		reactions: [ReactionSchema],
	},
	{
		toJSON: {
			virtuals: true,
			getters: true,
		},
		id: false,
	}
);

ThoughtSchema.virtual('reactionCount').get(function () {
	return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
