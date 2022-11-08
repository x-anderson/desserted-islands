const Post = require('../models/Post.js')

const getAllPosts = async (_, res, next) => {
    try {
     const allPosts = await Post
            .find({});

        res.status(200).json(allPosts);
    } catch (error) {
        next(error);
    }
}

module.exports = getAllPosts
