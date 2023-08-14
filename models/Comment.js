const mongoose = require('mongoose');
const Video = require('./Video.js');

const commentSchema = new mongoose.Schema({
    video: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: "is required!",
        ref: "User",
    },
    comment: {
        require: true,
        type: String
    },
    timestamp: {
        require: true,
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Comment', commentSchema)