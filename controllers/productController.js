const Product = require('../models/Product.js');
const Video = require('../models/Video.js');

const postData = async (req, res)=>{
    const { id } = req.params;
    const { productTitle, productImg, urlProduct, price } = req.body;
    try {
        const video = await Video.findById(id);
        const products = new Product({ videoId: id, productTitle, productImg, urlProduct, price })
        const productToSave = await products.save();

        const pushProductId = {
            $push: {
                productId: productToSave._id
            }
        }
        await video.updateOne(pushProductId);

        res.status(200).json(productToSave)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const getAll = async (req, res)=>{
    try {
        const products = await Product.find();
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = { getAll, postData }