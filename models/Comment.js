const mongoose = require('mongoose');
const Video = require('./Video.js');

const commentSchema = new mongoose.Schema({
    video: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video'
    },
    username: {
        require: true,
        type: String
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