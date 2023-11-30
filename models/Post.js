const db = require("../database/connect");
class Post {
    constructor({ post_id, post_name, user_id, conditions, description, location, price}) {
        this.post_id = post_id;
        this.post_name = post_name;
        this.user_id = user_id;
        this.conditions = conditions;
        this.description = description;
        this.location = location;
        this.price = price;
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM marketplace_posts ORDER BY post_id DESC;");
        if (response.rows.length === 0) {
            throw new Error("No posts available.")
        }
        return response.rows.map(g => new Post(g));
    }

    static async getTopSnack() {
        const response = await db.query("SELECT * FROM marketplace_posts ORDER BY description DESC LIMIT 1;");
        if (response.rows.length != 1) {
            throw new Error("Unable to locate snack.")
        }
        return new Post(response.rows[0]);
    }

    static async getOneById(post_id) {
        const response = await db.query("SELECT * FROM marketplace_posts WHERE post_id = $1;",[post_id]);

        if (response.rows.length != 1) {
            throw new Error("Unable to locate post.")
        }
        return new Post(response.rows[0]);
    }

    static async create(data) {
        const {post_name, user_id, conditions, description, location, price} = data;
        const response = await db.query('INSERT INTO marketplace_posts (post_name, user_id, conditions, description, location, price) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;',[post_name, user_id, conditions, description, location, price]);
        const postId = response.rows[0].post_id;
        const newPost = await Post.getOneById(postId);
        return newPost;
    }

    async update(data) {
        const response = await db.query("UPDATE marketplace_posts SET price = $1 WHERE post_id = $2 RETURNING *;",
            [parseInt(data.price), this.post_id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to update votes.")
        }
        return new Post(response.rows[0]);
    }

    async destroy() {
        const response = await db.query('DELETE FROM marketplace_posts WHERE post_id = $1 RETURNING *;', [this.post_id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to delete post.")
        }
        return new Post(response.rows[0]);
    }
}

module.exports = Post;