const Video = require('../models/Video.js');
const Product = require('../models/Product.js');

const postData = async (req, res)=>{
    const { title, urlThumbnail, urlVideo, desc, views } = req.body;
    try {
        const videos = new Video({ title, urlThumbnail, urlVideo, desc, views })
        const videoToSave = await videos.save();
        res.status(200).json(videoToSave)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

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
        const videos = await Video.findById(id);

        videos.views++;
        await videos.save();

        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = { postData, getAll, getId }