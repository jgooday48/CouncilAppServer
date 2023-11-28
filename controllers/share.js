const Share = require('../models/Share');

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
        const result = await Share.create(data);
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
        
        const post = await Share.getOneById(id);
        const result = await post.destroy();
        res.status(204).end();
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
};

module.exports = {
    index, create, show, update, destroy
}
