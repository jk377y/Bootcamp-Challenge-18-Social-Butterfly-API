const { Schema, model } = require('mongoose');

// needed to import data from thought.js
const thought = require('./thought');

const userSchema = new Schema (
    {
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /.+\@.+\..+/,
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        ]

    },
    {
        toJSON: {
            virtuals: true
        }
    }
)
userSchema.virtual('friendCount').get(function() {
    return this.friends.length
});

const user = model('user', userSchema)
module.exports = user;