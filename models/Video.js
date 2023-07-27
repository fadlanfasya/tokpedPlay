const mongoose = require('mongoose');
const Product = require('./Product.js');
const Comment = require('./Comment.js');

const videoSchema = new mongoose.Schema({
    productId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: Product
    }],
    commentId : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: Comment,
        default: undefined,
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
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Video', videoSchema)