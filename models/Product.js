const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    videoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video'
    },
    productTitle: {
        required: true,
        type: String
    },
    productImg: {
        required: true,
        type: String
    },
    urlProduct: {
        required: true,
        type: String
    },
    price: {
        required: true,
        type: Number
    }
});

module.exports = mongoose.model('Product', productSchema)