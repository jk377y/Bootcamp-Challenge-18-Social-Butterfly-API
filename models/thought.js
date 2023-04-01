const { Schema, model, Types } = require('mongoose');

const ReactionSchema = new Schema(
	{	
		//! not using the _id value so disabling it for cleaner returns from the query
		_id: false,
		//! the reactionId is required for the reaction to be deleted per the instructions
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
			// ! not needed, but used for formatting date to mm/dd/yyyy
			set: (createdAtVal) => new Date(createdAtVal),
			get: (createdAtVal) => new Date(createdAtVal).toLocaleString('en-US', { 
				month: '2-digit', 
				day: '2-digit', 
				year: 'numeric', 
				hour: '2-digit', 
				minute: '2-digit', 
				second: '2-digit', 
				hour12: false 
			})
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
			// ! not needed, but used for formatting date to mm/dd/yyyy
			set: (createdAtVal) => new Date(createdAtVal),
			get: (createdAtVal) => new Date(createdAtVal).toLocaleString('en-US', { 
				month: '2-digit', 
				day: '2-digit', 
				year: 'numeric', 
				hour: '2-digit', 
				minute: '2-digit', 
				second: '2-digit', 
				hour12: false 
			})
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