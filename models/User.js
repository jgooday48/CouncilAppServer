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
        const response = await db.query("SELECT * FROM user_account WHERE email = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate user.");
        }
        return new User(response.rows[0]);
    }

    static async getOneByUsername(username) {
        const response = await db.query("SELECT * FROM user_account WHERE email = $1", [username]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate user.");
        }
        return new User(response.rows[0]);
    }

    static async create(data) {
        const { username, password, name, surname } = data;
        let response = await db.query("INSERT INTO user_account (email, password,name, surname) VALUES ($1, $2) RETURNING user_id;",
            [username, password, name, surname]);
        const newId = response.rows[0].user_id;
        const newUser = await User.getOneById(newId);
        return newUser;
    }
}

module.exports = User;
