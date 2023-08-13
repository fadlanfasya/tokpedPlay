const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema([{
    title: {
        required: true,
        type: String
    },
    urlThumbnail: {
        required: true,
        type: String
    },
    urlVideo: {
        required: true,
        type: String
    },
    desc: {
        required: true,
        type: String
    },
    views: {
        required: true,
        type: Number,
        default: 0
    }
}])

module.exports = mongoose.model('Video', videoSchema)