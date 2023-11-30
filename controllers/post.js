const Post = require('../models/Post');
const Token = require("../models/Token");
const User = require("../models/User");


async function index(req, res) {
    try {
        const posts = await Post.getAll();
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ "error": err.message })
    }
};

async function show(req, res) {
    try {
        const id = parseInt(req.params.id);
        const post = await Post.getOneById(id);
        const user_id = post.user_id;
        const user = await User.getOneById(user_id)
        const { email: user_email, name: user_name } = user;

        // Merging user properties into the post object
        post.user_email = user_email;
        post.user_name = user_name;
        res.status(200).json(post);
    } catch (err) {
        res.status(404).json({ "error": err.message })
    }
};

async function byUser(req, res) {//turn to byUser
    try {
        const post = await Post.getTopSnack();
        res.status(200).json(post);
    } catch (err) {
        res.status(404).json({ "error": err.message })
    }
};

async function create(req, res) {
    try {
        const userToken = req.headers["authorization"];
        const data = req.body;

        const validToken = await Token.getOneByToken(userToken);
        data.user_id = validToken.user_id;
        const newPost = await Post.create(data);
        res.status(201).json(newPost);
    } catch (err) {
        res.status(400).json({ "error": err.message })
    }
};

async function update(req, res) {
    try {
        const id = parseInt(req.params.id);
        const userToken = req.headers["authorization"];
        const data = req.body;
        let validToken;
        //check if token belongs user_id in the post
        validToken = await Token.getOneByToken(userToken);
        const post = await Post.getOneById(id);
        if(validToken.user_id === post.user_id){
            const result = await post.update(data);
            res.status(200).json(result);
        }else {
            res.status(403).json({ "message": "you aren't allowed to modify this post"});
        }
    } catch (err) {
        res.status(404).json({ "error": err.message })
    }
};

async function destroy(req, res) {
    try {
        const userToken = req.headers["authorization"];
        const id = parseInt(req.params.id);
        let validToken;
        validToken = await Token.getOneByToken(userToken);
        const userPosting = await User.getOneById(validToken.user_id);
        const post = await Post.getOneById(id);
        if(validToken.user_id === post.user_id || userPosting.isAdmin === "TRUE")
        {
            const result = await post.destroy();
            res.status(204).end();
        }else {
        res.status(403).json({ "message": "you aren't allowed to modify this post"});
        }
    } catch (err) {
        res.status(404).json({ "error": err.message })
    }
};

module.exports = {
    index, show, byUser, create, update, destroy
};