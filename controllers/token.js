const Token = require('../models/Token');

async function index (req, res) {
    try {
        const tokens = await Token.getAll();
        res.json(tokens);
    } catch (err) {
        res.status(500).json({"error": err.message})
    }
};

async function destroy(req, res) {
    try {
        const token = req.params.token;
        const tokenToRemove = await Token.getOneByToken(token);
        const result = await tokenToRemove.destroy();
        res.status(200).json(result);
    } catch (err) {
        res.status(404).json({ "error": err.message })
    }
}

module.exports = {
    index, destroy
}
