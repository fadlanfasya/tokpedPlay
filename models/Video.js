const mongoose = require('mongoose');
const Product = require('./Product');
const Comment = require('./Comment');

const videoSchema = new mongoose.Schema({
    productId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    commentId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
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
        type: Number
    },
    name: {
        type: String,
    },
})

module.exports = mongoose.model('Video', videoSchema)