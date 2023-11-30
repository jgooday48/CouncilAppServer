const db = require('../database/connect');


class Book {
    constructor(data) {
        this.id = data.post_id,
        this.user_id = data.user_id,
        this.title = data.title,
        this.author = data.author,
        this.content = data.content,
        this.link = data.link
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM book ORDER BY post_id DESC");
        return response.rows.map(p => new Book(p));
    }


    static async getOneById(id) {
        const response = await db.query("SELECT * FROM book WHERE post_id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate post.");
        }
        return new Book(response.rows[0]);
    }


    static async create(data) {
        const { title, author, content, user_id, link } = data;
        let response = await db.query("INSERT INTO book (user_id, title, author, content, link) VALUES ($1, $2, $3, $4, $5) RETURNING post_id;",
            [user_id, title, author, content, link]);
            // console.log("User ID:", userId);

        const newId = response.rows[0].post_id
        const newPost = await Post.getOneById(newId)
            
        return newPost;
    }

    async update(data) {
        const response = await db.query("UPDATE book SET content = $1 WHERE post_id = $2 RETURNING *;", [data.content, this.id]);

        if (response.rows.length != 1) {
            throw new Error("Unable to update content.")
        }

        return new Book(response.rows[0]);
    }

    async destroy() {
        let response = await db.query("DELETE FROM book WHERE post_id = $1 RETURNING *;", [this.id]);
        return new Book(response.rows[0]);
    }

}

module.exports = Book
