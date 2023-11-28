const db = require('../database/connect');


class Share {
    constructor(data) {
        this.id = data.post_id,
        this.userId = data.user_id,
        this.title = data.title,
        this.content = data.content        
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM share ORDER BY post_id DESC");
        return response.rows.map(p => new Share(p));
    }


    static async getOneById(id) {
        const response = await db.query("SELECT * FROM share WHERE post_id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate post.");
        }
        return new Share(response.rows[0]);
    }


    static async create(data) {
        const { title, content, userId } = data;
        let response = await db.query("INSERT INTO share (user_id, title, content) VALUES ($1, $2, $3) RETURNING post_id;",
            [ userId,title, content]);
            // console.log("User ID:", userId);
            
        return new Share(response.rows[0]);
    }

    async update(data) {
        const response = await db.query("UPDATE share SET content = $1 WHERE post_id = $2 RETURNING *;", [data.content, this.id]);

        if (response.rows.length != 1) {
            throw new Error("Unable to update content.")
        }

        return new Share(response.rows[0]);
    }

    async destroy() {
        let response = await db.query("DELETE FROM share WHERE post_id = $1 RETURNING *;", [this.id]);
        return new Share(response.rows[0]);
    }

}

module.exports = Share
