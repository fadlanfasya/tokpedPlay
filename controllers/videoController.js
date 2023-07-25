const Video = require('../models/Video.js');

const getAll = async (req, res)=>{
    try {
        const videos = await Video.find();
        res.status(200).json(videos)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getId = async (req, res)=>{
    try {
        const id = req.params.id;
        const videos = await Video.findById(id).populate('productId').populate('commentId');

        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = { getAll, getId }