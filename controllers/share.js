const Share = require('../models/Share');
const Token = require('../models/Token')
const User = require('../models/User')

async function index (req, res) {
    try {
        const posts = await Share.getAll();
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({"error": err.message})
    }
};

async function create (req, res) {
    try {
        const data = req.body;
        const userToken = req.headers['authorization'];
        const token = await Token.getOneByToken(userToken);
        const result = await Share.create({...data, user_id: token.user_id});
        res.status(201).send(result);
    } catch (err) {
        res.status(400).json({"error": err.message})
    }
};

async function show (req, res) {
    try {
        const id = parseInt(req.params.id);
        const post = await Share.getOneById(id);
        res.status(200).json(post);
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
};


async function update(req,res) {
    try {
        const id = parseInt(req.params.id)
        const data = req.body
        const postToUpdate = await Share.getOneById(id)
        const updatedPost = await postToUpdate.update(data)
        res.status(200).send(updatedPost)
        
    } catch (err) {
        res.status(404).json({"error": err.message})
        
    }
}

async function destroy (req, res) {
    try {
        const id = parseInt(req.params.id);
        const userToken = req.headers['authorization'];
        const token = await Token.getOneByToken(userToken);
        const user = await User.getOneById(token.user_id);
        
        const post = await Share.getOneById(id);

        res.status(204).end();

        if (post.user_id === user.id) {
            const result = await post.destroy();
            res.status(204).end();
          } else {
            res.status(403).json({
              error: 'You cant delete this'
            });
          }
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
};

module.exports = {
    index, create, show, update, destroy
}
