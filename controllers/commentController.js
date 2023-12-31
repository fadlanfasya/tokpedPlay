const Comment = require('../models/Comment.js');
const Video = require('../models/Video.js');

const postData = async (req, res)=> {
    const { id } = req.params;
    const { username, comment } = req.body;
    try {
        const video = await Video.findById(id);
        const comments = new Comment({ videoId: id, username, comment})
        const commentToSave = await comments.save();
    
        const pushCommentId = {
            $push: {
                commentId: commentToSave._id
            }
        }
        await video.updateOne(pushCommentId);

        res.status(200).json(commentToSave)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const getData = async (req, res) => {
    try {
        const id = req.params.id;
        const comments = await Comment.find({
            videoId: id,
        });
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = { postData, getData }