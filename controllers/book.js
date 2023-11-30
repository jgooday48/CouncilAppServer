const Book = require('../models/Book');
const Token = require('../models/Token')
const User = require('../models/User')

async function index (req, res) {
    try {
        const posts = await Book.getAll();
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
        const result = await Book.create({...data, user_id: token.user_id});
        res.status(201).send(result);
    } catch (err) {
        res.status(400).json({"error": err.message})
        console.log(err.message)
    }
};

async function show (req, res) {
    try {
        const id = parseInt(req.params.id);
        const post = await Book.getOneById(id);
        res.status(200).json(post);
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
};

async function update(req, res) {
    try {
        const id = parseInt(req.params.id)
        const data = req.body
        const userToken = req.headers['authorization'];
        const token = await Token.getOneByToken(userToken);
        const user = await User.getOneById(token.user_id);
        const book = await Book.getOneById(id);

        console.log('book.user_id:', book.user_id);
        console.log('user.id:', user.id);

        if (book.user_id === user.id) {
            const postToUpdate = await Book.getOneById(id)
            console.log('Updating post:', postToUpdate);

            const updatedPost = await postToUpdate.update(data)
            console.log('Updated post:', updatedPost);

            res.status(200).send(updatedPost)
        } else {
            res.status(404).json({ error: 'You cant edit this' });
        }
    } catch (err) {
        console.error('Error updating post:', err);
        res.status(404).json({ "error": err.message })
    }
}


async function destroy (req, res) {
    try {
        const id = parseInt(req.params.id);
        const userToken = req.headers['authorization'];
        const token = await Token.getOneByToken(userToken);
        const user = await User.getOneById(token.user_id);
        
        const book = await Book.getOneById(id);


        if (book.user_id === user.id) {
            const result = await book.destroy();
            res.status(204).end();
          } else {
            res.status(403).json({error: 'You cant delete this as you are not the user who posted this'});
          }
    } catch (err) {
        res.status(404).json({"error": err.message})
        console.log(err.message)
    }
};


module.exports = {
    index, create, show, update, destroy
}
