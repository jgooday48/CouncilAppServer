const { v4: uuidv4 } = require("uuid");

const db = require("../database/connect");

class Token {

    constructor({ token_id, user_id, token }){
        this.token_id = token_id;
        this.user_id = user_id;
        this.token = token;
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM token");
        return response.rows.map(p => new Token(p));
    }

    static async create(user_id) {
        const token = uuidv4();
	let response;
	const userExists = await db.query("SELECT * FROM token where user_id = $1",[user_id])
	if(userExists.rows.length > 0){
		response = await db.query("UPDATE token SET token = $2 WHERE user_id = $1 RETURNING token_id;",
            	[user_id, token]);
	}else{
        	response = await db.query("INSERT INTO token (user_id, token) VALUES ($1, $2) RETURNING token_id;",
            	[user_id, token]);
	}
        const newId = response.rows[0].token_id;
        const newToken = await Token.getOneById(newId);
        return newToken;
    }
    
    static async getOneById(id) {
        const response = await db.query("SELECT * FROM token WHERE token_id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate token.");
        } else {
            return new Token(response.rows[0]);
        }
    }

    static async getOneByToken(token) {
        const response = await db.query("SELECT * FROM token WHERE token = $1", [token]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate token.");
        } else {
            return new Token(response.rows[0]);
        }
    }

    async destroy() {
        const response = await db.query("DELETE FROM token WHERE token = $1 RETURNING *;", [this.token]);
        if (response.rows.length != 1) {
            throw new Error("Unable to delete token.")
        }
        return new Token(response.rows[0]);
    }

}

module.exports = Token;
