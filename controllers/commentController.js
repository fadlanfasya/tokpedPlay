const Comment = require('../models/Comment.js');
const Video = require('../models/Video.js');

const postData = async (req, res)=> {
    const { id } = req.params;
    const { username, comment } = req.body;
    try {
        const video = await Video.findById(id);
        const comments = new Comment({ videoId: id, username, comment})
        const commentToSave = await comments.save();
        
        //video.commentId.push(commentToSave._id);
        const pushCommentId = {
            $set: {
                commentId: commentToSave._id
            }
        }
        await video.updateOne(pushCommentId);

        res.status(200).json(commentToSave)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

module.exports = { postData }