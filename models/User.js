const db = require('../database/connect');

class User {

    constructor(data) {
        this.id = data.user_id;
        this.email = data.email;
        this.password = data.password;
        this.name = data.name
        this.surname = data.surname
        this.isAdmin = data.is_admin;
    }

    

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM user_account WHERE user_id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate user.");
        }
        return new User(response.rows[0]);
    }

    static async getOneByEmail(email) {
        const response = await db.query("SELECT * FROM user_account WHERE email = $1", [email]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate user.");
        }
        return new User(response.rows[0]);
    }

    static async create(data) {
        const { email, password, name, surname } = data;
        let response = await db.query("INSERT INTO user_account (email, password, name, surname) VALUES ($1, $2,$3, $4) RETURNING user_id;",
            [email, password, name, surname]);
        const newId = response.rows[0].user_id;
        const newUser = await User.getOneById(newId);
        return newUser;
    }
}

module.exports = User;
